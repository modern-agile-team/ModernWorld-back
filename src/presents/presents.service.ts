import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PresentsRepository } from "./presents.repository";
import { InventoryRepository } from "src/inventory/inventory.repository";
import { AcceptReject } from "./enum/present-status-enum";
import { ItemsRepository } from "src/items/items.repository";
import { UsersRepository } from "src/users/users.repository";
import { SenderReceiverNoField } from "./enum/present-senderReceiverNo-enum";

@Injectable()
export class PresentsService {
  constructor(
    private readonly presentRepository: PresentsRepository,
    private readonly inventoryRepository: InventoryRepository,
    private readonly itemsRepository: ItemsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async getPresents(
    userNo: number,
    senderReceiverNoField: SenderReceiverNoField,
  ): Promise<object> {
    const senderReceiverDeleteField =
      senderReceiverNoField === "receiverNo"
        ? "receiverDelete"
        : "senderDelete";

    return await this.presentRepository.getPresents(
      userNo,
      senderReceiverNoField,
      senderReceiverDeleteField,
    );
  }

  async getOnePresent(userNo: number, presentNo: number) {
    const present =
      await this.presentRepository.getOnePresentWithItemUserInformation(
        presentNo,
      );

    if (
      present.userPresentReceiverNo.no !== userNo &&
      present.userPresentSenderNo.no !== userNo
    ) {
      throw new ForbiddenException("This present is not related with user.");
    }

    if (
      present.userPresentReceiverNo.no === userNo &&
      present.status === "unread"
    ) {
      await this.presentRepository.updateOnePresentStatusFromUnreadToRead(
        presentNo,
      );

      present.status === "unread" ? (present.status = "read") : null;
    }

    return present;
  }

  async acceptOrRejectOnePresent(
    userNo: number,
    presentNo: number,
    acceptReject: AcceptReject,
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

    const { receiverNo, status, itemNo } =
      await this.presentRepository.getOnePresent(presentNo);

    if (userNo !== receiverNo) {
      throw new ForbiddenException("Users can only accept their own gifts.");
    }

    if (status !== "read") {
      throw new ForbiddenException("Present's status must be 'read'");
    }

    await this.presentRepository.updateOnePresentStatus(
      presentNo,
      acceptReject,
    );

    if (acceptReject === "accept") {
      const existItem = await this.inventoryRepository.findOneItem(
        userNo,
        itemNo,
      );

      if (existItem) {
        const item = await this.itemsRepository.getOneItem(itemNo);

        await this.usersRepository.updateUserCurrentPointAccumulationPoint(
          userNo,
          item.price / 2,
        );

        return true;
      }
    }

    await this.inventoryRepository.addOneItem(userNo, itemNo);

    return true;
  }

  async updateOnePresentTodelete(userNo: number, presentNo: number) {
    /**
     * 매개변수에 해당하는 선물이 실제로 존재하는지 확인하고
     *
     * 존재하지 않거나 이미 발신/수신자 입장에서 삭제처리 되어있으면 에러 때리고
     *
     * 존재한다면 수/발신자 삭제 필드 에 따라 true로 설정
     *
     *
     *
     *
     */

    const present = await this.presentRepository.getOnePresent(presentNo);

    if (!present) {
      throw new NotFoundException("Couldn't find this present.");
    }

    const { senderNo, receiverNo, senderDelete, receiverDelete } = present;

    if (userNo === senderNo) {
      if (senderDelete === true) {
        throw new ForbiddenException("Already deleted from sender");
      }

      return await this.presentRepository.updateOnePresentToDeleteBySenderReceiver(
        presentNo,
        "senderDelete",
      );
    } else if (userNo === receiverNo) {
      if (receiverDelete === true) {
        throw new ForbiddenException("Already deleted from receiver");
      }

      return await this.presentRepository.updateOnePresentToDeleteBySenderReceiver(
        presentNo,
        "receiverDelete",
      );
    }

    throw new ForbiddenException("This present is not related with you.");
  }

  async createOnePresent(senderNo: number, itemNo: number, receiverNo: number) {
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

    //4번 과정 마저 할것.
    await this.usersRepository.updateUserCurrentPoint(senderNo, -item.price);
    const present = await this.presentRepository.createOneItemToUser(
      senderNo,
      receiverNo,
      itemNo,
    );

    return present;
  }
}
