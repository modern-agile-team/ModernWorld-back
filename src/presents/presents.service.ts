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
}
