import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { PresentsRepository } from "./presents.repository";
import { InventoryRepository } from "src/inventory/inventory.repository";
import { ItemsRepository } from "src/items/items.repository";
import { UsersRepository } from "src/users/users.repository";
import { PresentAcceptRejectDto } from "./dtos/present-accept-reject.dto";
import { SenderReceiverNoDto } from "src/common/dtos/sender-receiver-no.dto";
import { ItemNoDto } from "./dtos/item-no.dto";
import { GetUserOnePresentResponseDto } from "./dtos/get-user-one-present-response.dto";
import { PresentsWithoutDeleteResponseDto } from "./dtos/presents-without-delete-response.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { LegendsRepository } from "src/legends/legends.repository";
import { SseService } from "src/sse/sse.service";
import { AlarmsRepository } from "src/alarms/alarms.repository";
import { PresentStatus, Prisma } from "@prisma/client";
import { UserAchievementsService } from "src/user-achievements/user-achievements.service";

@Injectable()
export class PresentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
    private readonly presentsRepository: PresentsRepository,
    private readonly inventoryRepository: InventoryRepository,
    private readonly itemsRepository: ItemsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly legendsRepository: LegendsRepository,
    private readonly sseService: SseService,
    private readonly alarmsRepository: AlarmsRepository,
    private readonly userAchievementsService: UserAchievementsService,
  ) {}

  getUserPresents(userNo: number, query: SenderReceiverNoDto) {
    const { type } = query;

    const senderReceiverDeleteField =
      type === "receiverNo"
        ? "receiverDelete"
        : type === "senderNo"
          ? "senderDelete"
          : undefined;

    const where = type
      ? { [type]: userNo, [senderReceiverDeleteField]: false }
      : {
          OR: [
            { senderNo: userNo, senderDelete: false },
            { receiverNo: userNo, receiverDelete: false },
          ],
        };

    return this.presentsRepository.getPresents(where);
  }

  async getUserOnePresent(userNo: number, presentNo: number) {
    const present =
      await this.presentsRepository.getUserOnePresentWithItemUserInfo(
        presentNo,
      );

    if (!present) {
      throw new NotFoundException("This present doesn't exist.");
    }

    const { userPresentReceiverNo: receiver, userPresentSenderNo: sender } =
      present;

    if (receiver?.no !== userNo && sender?.no !== userNo) {
      throw new ForbiddenException("This present is not related with user.");
    }

    if (userNo === receiver?.no && present.receiverDelete) {
      throw new NotFoundException("This present was deleted from receiver.");
    } else if (userNo === sender?.no && present.senderDelete) {
      throw new NotFoundException("This present was deleted from sender.");
    }

    if (receiver?.no === userNo && present.status === PresentStatus.unread) {
      const updatedPresent =
        await this.presentsRepository.updateOnePresentStatusFromUnreadToRead(
          presentNo,
        );

      return new GetUserOnePresentResponseDto(updatedPresent);
    }

    return new GetUserOnePresentResponseDto(present);
  }

  async acceptOrRejectOnePresent(
    userNo: number,
    presentNo: number,
    body: PresentAcceptRejectDto,
  ) {
    /**
     * 1. 선물의 수신자가 해당 인물이 맞는지 확인 (present) ㅇ
     *    -다르면 에러
     *
     * 2. 맞으면 아이템의 status상태가 read인 놈을 accept로 바꿈(present) ㅇ
     *
     * 3. inventory에 해당 아이템이 이미 있는 아이템인지 확인 (inventory) ㅇ
     *    - 있으면 해당 아이템 값의 50% 포인트 up (user)
     *
     * 4. 없다면 인벤토리 테이블에 해당 아이템 추가 (inventory)
     *
     * 2, 3, 4의 과정은 한번에 이루어져야 할듯 트랜잭션으로 묶기
     *
     */
    const acceptReject = body.status;

    const { receiverNo, status, itemNo } =
      await this.presentsRepository.getOnePresent(presentNo);

    if (userNo !== receiverNo) {
      throw new ForbiddenException(
        "Users can only accept or reject their own gifts.",
      );
    }

    if (status !== "read") {
      throw new ForbiddenException("Present's status must be 'read'");
    }

    if (acceptReject === "accept") {
      const existedItem = await this.inventoryRepository.findOneItem(
        userNo,
        itemNo,
      );

      if (existedItem) {
        // 아 이건 아무리 생각해도 좀 아닌데 여기 로직은 나중에 반드시 생각해볼것.
        // 유저가 아이템을 이미 갖고있다면 그 값의 반을 포인트로 주는 로직인데 다른 반환값들과는 차별성이 있어야할 필요성이 보임
        // 프론트와 상의후 바꿀것 ------------------------------------------------
        const item = await this.itemsRepository.getOneItem(itemNo);

        await this.usersRepository.updateUserCurrentPointAccumulationPoint(
          userNo,
          item.price / 2,
        );
        const processedPresent =
          await this.presentsRepository.updateOnePresentStatus(
            presentNo,
            acceptReject,
          );

        return new PresentsWithoutDeleteResponseDto(processedPresent);
      }

      try {
        const processedPresent = await this.prisma.$transaction(async (tx) => {
          await this.legendsRepository.updateOneLegendByUserNo(
            userNo,
            {
              itemCount: { increment: 1 },
            },
            tx,
          );

          await this.inventoryRepository.createUserOneItem(userNo, itemNo, tx);

          await this.userAchievementsService.checkAchievementCondition(
            userNo,
            "itemCount",
            tx,
          );

          return this.presentsRepository.updateOnePresentStatus(
            presentNo,
            acceptReject,
            tx,
          );
        });

        return new PresentsWithoutDeleteResponseDto(processedPresent);
      } catch (err) {
        this.logger.error(`transaction Error : ${err}`);
        throw new InternalServerErrorException();
      }
    }

    const processedPresent =
      await this.presentsRepository.updateOnePresentStatus(
        presentNo,
        acceptReject,
      );

    return new PresentsWithoutDeleteResponseDto(processedPresent);
  }

  async updateOnePresentToDelete(userNo: number, presentNo: number) {
    const present = await this.presentsRepository.getOnePresent(presentNo);

    if (!present) {
      throw new NotFoundException("This present doesn't exist.");
    }

    const { senderNo, receiverNo, senderDelete, receiverDelete } = present;

    if (userNo !== senderNo && userNo !== receiverNo) {
      throw new ForbiddenException("This present is not related with you.");
    }

    const isSender = userNo === senderNo;

    if (isSender && senderDelete) {
      throw new ConflictException("Already deleted from sender.");
    } else if (receiverDelete) {
      throw new ConflictException("Already deleted from receiver.");
    }

    const senderReceiverDeleteField = isSender
      ? "senderDelete"
      : "receiverDelete";

    return this.presentsRepository.updateOnePresentToDeleteByUser(
      presentNo,
      senderReceiverDeleteField,
    );
  }

  async createOnePresent(
    senderNo: number,
    receiverNo: number,
    body: ItemNoDto,
  ) {
    /**
     *
     * 아이템을 특정유저에게 선물하는 로직
     * 0. 본인이 본인한테 선물하는거 막아야됨
     *
     * 1. 그 아이템이 실제로 아이템 테이블에 존재하는 지 확인 (itemsRepository)
     *
     * 2. 포인트가 아이템 가격보다 높은지 확인 (usersRepository)
     *
     * 3. 선물 받을 유저가 진짜 존재하는지 확인 (usersRepository)
     *
     * 4. present 에 추가 및 포인트 감소(presentsRepository) 트랜잭션으로 묶을것
     */

    const { itemNo } = body;

    if (senderNo === receiverNo) {
      throw new ForbiddenException("User cannot gift themselves alone.");
    }

    const item = await this.itemsRepository.getOneItem(itemNo);

    if (!item) {
      throw new NotFoundException("Item doesn't exist.");
    }

    const { nickname, currentPoint } =
      await this.usersRepository.findUserPoint(senderNo);

    if (currentPoint < item.price) {
      throw new ForbiddenException("User doesn't have enough point.");
    }

    const isUser = await this.usersRepository.findUserPoint(receiverNo);

    if (!isUser) {
      throw new NotFoundException("Couldn't find receiver.");
    }

    let present: Prisma.PromiseReturnType<
      typeof this.presentsRepository.createOneItemToUser
    >;

    try {
      present = await this.prisma.$transaction(async (tx) => {
        await this.legendsRepository.updateOneLegendByUserNo(
          senderNo,
          {
            presentCount: { increment: 1 },
          },
          tx,
        );

        await this.userAchievementsService.checkAchievementCondition(
          senderNo,
          "presentCount",
          tx,
        );

        await this.alarmsRepository.createOneAlarm(
          receiverNo,
          `${nickname}님이 ${item.name}을 선물로 보냈습니다.`,
          "선물",
          tx,
        );

        await this.usersRepository.updateUserCurrentPoint(
          senderNo,
          -item.price,
          tx,
        );

        return this.presentsRepository.createOneItemToUser(
          senderNo,
          receiverNo,
          itemNo,
          tx,
        );
      });
    } catch (err) {
      this.logger.error(`transaction Error : ${err}`);
      throw new InternalServerErrorException();
    }

    this.sseService.sendSse(receiverNo, {
      title: "선물",
      content: `${nickname}님이 ${item.name}을 선물로 보냈습니다.`,
    });

    return new PresentsWithoutDeleteResponseDto(present);
  }
}
