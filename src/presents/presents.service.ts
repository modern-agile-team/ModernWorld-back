import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PresentsRepository } from "./presents.repository";
import { NotFoundError } from "rxjs";
import { InventoryRepository } from "src/inventory/inventory.repository";
import { PresentStatus } from "./enum/present-status-enum";
import { SenderReceiverNoField } from "./enum/present-senderReceiverNo-enum";

@Injectable()
export class PresentsService {
  constructor(
    private readonly presentRepository: PresentsRepository,
    private readonly inventoryRepository: InventoryRepository,
  ) {}

  async getOneOrManyPresentsByBox(
    userNo: number,
    where: string,
    presentNo?: number,
  ) {
    if (where !== "receiverNo" && where !== "senderNo") {
      throw new BadRequestException(
        "where has two options : receiverNo, senderNo",
      );
    }

    const deletion = where === "receiverNo" ? "receiverDelete" : "senderDelete";

    if (presentNo) {
      const result = await this.presentRepository.getOnePresentByBox(
        userNo,
        where,
        presentNo,
        deletion,
      );

      if (where === "receiverNo" && result.status === "unread") {
        await this.presentRepository.updateOnePresentStatusFromUnreadToRead(
          result.no,
        );
      }

      return result;
    }

    const result = await this.presentRepository.getPresentsByBox(
      userNo,
      where,
      deletion,
    );

    return result;
  }

  async acceptOnePresent(userNo: number, presentNo: number) {
    /**
     * 아이템의 status상태가 read인 놈을 accept로 바꾸고
     *
     * inventory에 해당 아이템이 이미 있는 아이템인지 확인
     *
     * 이미 있다면 그 값어치의 50%만큼만 가져오고 없다면 아이템 생성
     *
     * inventory에 해당 아이템의 번호를 넣음
     *
     * 트랜잭션으로 한번에 넣을것.
     *
     *
     */
    const { status, itemNo } =
      await this.presentRepository.getInboxPresentStatusItemNo(
        userNo,
        presentNo,
      );

    console.log(status, itemNo);
    console.log(typeof status);

    //인벤토리에 해당 아이템이 이미 있는 아이템인지 확인할것. 아직 추가못함----------------------------

    if (status === "unread" || "accept" || "reject") {
      throw new ForbiddenException("Present has already been processed");
    }

    await this.presentRepository.updateOnePresentStatus(
      presentNo,
      PresentStatus.ACCEPT,
    );

    await this.inventoryRepository.addItemToInventory(userNo, itemNo);

    // 마저 작업할것
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
