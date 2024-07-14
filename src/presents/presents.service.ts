import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PresentsRepository } from "./presents.repository";
import { InventoryRepository } from "src/inventory/inventory.repository";
import { ItemsRepository } from "src/items/items.repository";
import { UsersRepository } from "src/users/users.repository";
import { PresentAcceptRejectDto } from "./dtos/present-accept-reject.dto";
import { ItemNoDto } from "./dtos/item-no.dto";
import { GetUserPresentsDto } from "./dtos/get-user-presents.dto";
import { GetUserOnePresentResponseDto } from "./dtos/get-user-one-present-response.dto";
import { UpdatePresentsStatusResponseDto } from "./dtos/update-presents-status-response.dto";

@Injectable()
export class PresentsService {
  constructor(
    private readonly presentRepository: PresentsRepository,
    private readonly inventoryRepository: InventoryRepository,
    private readonly itemsRepository: ItemsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  getUserPresents(userNo: number, query: GetUserPresentsDto) {
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

    return this.presentRepository.getPresents(where);
  }

  async getUserOnePresent(userNo: number, presentNo: number) {
    const present =
      await this.presentRepository.getUserOnePresentWithItemUserInfo(presentNo);

    if (!present) {
      throw new NotFoundException("This present doesn't exist.");
    }

    const { userPresentReceiverNo: receiver, userPresentSenderNo: sender } =
      present;

    if (receiver.no !== userNo && sender.no !== userNo) {
      throw new ForbiddenException("This present is not related with user.");
    }

    if (userNo === receiver.no && present.receiverDelete) {
      throw new ForbiddenException("This present was deleted from receiver.");
    } else if (userNo === sender.no && present.senderDelete) {
      throw new ForbiddenException("This present was deleted from sender.");
    }

    if (receiver.no === userNo && present.status === "unread") {
      const updatedPresent =
        await this.presentRepository.updateOnePresentStatusFromUnreadToRead(
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
      await this.presentRepository.getOnePresent(presentNo);

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
        const item = await this.itemsRepository.getOneItem(itemNo);

        await this.usersRepository.updateUserCurrentPointAccumulationPoint(
          userNo,
          item.price / 2,
        );
        const processedPresent =
          await this.presentRepository.updateOnePresentStatus(
            presentNo,
            acceptReject,
          );

        return new UpdatePresentsStatusResponseDto(processedPresent);
      }

      await this.inventoryRepository.createUserOneItem(userNo, itemNo);

      const processedPresent =
        await this.presentRepository.updateOnePresentStatus(
          presentNo,
          acceptReject,
        );

      return new UpdatePresentsStatusResponseDto(processedPresent);
    }

    const processedPresent =
      await this.presentRepository.updateOnePresentStatus(
        presentNo,
        acceptReject,
      );

    return new UpdatePresentsStatusResponseDto(processedPresent);
  }

  async updateOnePresentTodelete(userNo: number, presentNo: number) {
    /**
     * 매개변수에 해당하는 선물이 실제로 존재하는지 확인하고
     *
     * 존재하지 않거나 이미 발신/수신자 입장에서 삭제처리 되어있으면 에러 때리고
     *
     * 존재한다면 수/발신자 삭제 필드 에 따라 true로 설정
     */

    const present = await this.presentRepository.getOnePresent(presentNo);

    if (!present) {
      throw new NotFoundException("Couldn't find this present.");
    }

    const { senderNo, receiverNo, senderDelete, receiverDelete } = present;

    if (userNo === senderNo) {
      if (senderDelete === true) {
        throw new ConflictException("Already deleted from sender.");
      }

      return this.presentRepository.updateOnePresentToDeleteByUser(
        presentNo,
        "senderDelete",
      );
    } else if (userNo === receiverNo) {
      if (receiverDelete === true) {
        throw new ConflictException("Already deleted from receiver.");
      }

      return this.presentRepository.updateOnePresentToDeleteByUser(
        presentNo,
        "receiverDelete",
      );
    }

    throw new ForbiddenException("This present is not related with you.");
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

    const { currentPoint } = await this.usersRepository.findUserPoint(senderNo);

    if (currentPoint < item.price) {
      throw new ForbiddenException("User doesn't have enough point.");
    }

    const isUser = await this.usersRepository.findUserPoint(receiverNo);

    if (!isUser) {
      throw new NotFoundException("Couldn't find receiver.");
    }

    //트랜잭션 묶을것.
    await this.usersRepository.updateUserCurrentPoint(senderNo, -item.price);

    return this.presentRepository.createOneItemToUser(
      senderNo,
      receiverNo,
      itemNo,
    );
  }
}
