import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PresentsRepository } from "./presents.repository";
import { InventoryRepository } from "src/inventory/inventory.repository";
import { AcceptReject } from "./enum/present-status-enum";
import { SenderReceiverNoField } from "./enum/present-senderReceiverNo-enum";

@Injectable()
export class PresentsService {
  constructor(
    private readonly presentRepository: PresentsRepository,
    private readonly inventoryRepository: InventoryRepository,
  ) {}

  async getOneOrManyPresentsByBox(
    userNo: number,
    senderReceiverNoField?: SenderReceiverNoField,
    presentNo?: number,
  ): Promise<object> {
    const senderReceiverDeleteField =
      senderReceiverNoField === "receiverNo"
        ? "receiverDelete"
        : "senderDelete";

    if (presentNo) {
      const result = await this.presentRepository.getOnePresentByBox(
        userNo,
        senderReceiverNoField,
        presentNo,
        senderReceiverDeleteField,
      );

      if (
        senderReceiverNoField === "receiverNo" &&
        result.status === "unread"
      ) {
        await this.presentRepository.updateOnePresentStatusFromUnreadToRead(
          result.no,
        );
      }

      return result;
    }

    const result = await this.presentRepository.getPresents(
      userNo,
      senderReceiverNoField,
      senderReceiverDeleteField,
    );

    return result;
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
      throw new NotFoundException("receiverNo doesn't match userNo");
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
        // 아이템 가격은 아이템 레포에서 찾아와야함 머지 될시 이 작업 꼭 해둘것 --------------
        //포인트 넣어주는 로직 추가할것-------------------------------------
        // this.userRepository.modifyUserCurrentPoint(userNo,-existItem.)

        return 0;
      }
    }

    await this.inventoryRepository.addOneItem(userNo, itemNo);

    return true;
  }

  async updateOnePresentTodelete(
    userNo: number,
    senderReceiverNoField: SenderReceiverNoField,
    presentNo: number,
  ) {
    /**
     * 매개변수에 해당하는 선물이 실제로 존재하는지 확인하고
     *
     * 존재하지 않거나 이미 발신/수신자 입장에서 삭제처리 되어있으면 에러 때리고
     *
     * 존재한다면 수/발신자 삭제 필드 에 따라 true로 설정
     *
     */

    const senderReceiverDeleteField =
      senderReceiverNoField === "receiverNo"
        ? "receiverDelete"
        : "senderDelete";

    const hasPresent = await this.presentRepository.getOnePresentByBox(
      userNo,
      senderReceiverNoField,
      presentNo,
      senderReceiverDeleteField,
    );

    if (!hasPresent) {
      throw new NotFoundException("already deleted or couldn't find");
    }

    const result =
      await this.presentRepository.updateOnePresentStatusToDeleteBySenderReceiver(
        userNo,
        senderReceiverNoField,
        presentNo,
        senderReceiverDeleteField,
      );

    return result;
  }
}
