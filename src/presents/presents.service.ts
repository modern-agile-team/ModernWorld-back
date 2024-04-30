import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PresentsRepository } from "./presents.repository";
import { NotFoundError } from "rxjs";
import { InventoryRepository } from "src/inventory/inventory.repository";

@Injectable()
export class PresentsService {
  constructor(
    private readonly presentRepository: PresentsRepository,
    private readonly inventoryRepository: InventoryRepository,
  ) {}

  async getInboxPresents(userNo: number) {
    const result =
      await this.presentRepository.getInboxPresentsByUserNo(userNo);

    return result;
  }

  async getOutboxPresents(userNo: number) {
    const result =
      await this.presentRepository.getOutboxPresentsByUserNo(userNo);

    return result;
  }

  async getInboxOnePresent(userNo: number, presentNo: number) {
    /**
     * 선물의 상태는 4가지이다. unread, read, accept, reject
     * 이 로직은 선물을 조회하는 로직이기때문에 만약 물건의 상태가 unread라면
     *  read로 바꾸어 주어야한다.
     *
     * 이걸 주의해서 로직을 구현하도록 하자.
     */
    const result =
      await this.presentRepository.getInboxOnePresentByUserNoPresentNo(
        userNo,
        presentNo,
      );

    if (result.status === "unread") {
      await this.presentRepository.updateOnePresentStatusFromUnreadToRead(
        result.no,
      );
    }

    return result;
  }

  async getOutboxOnePresent(userNo: number, presentNo: number) {
    const result =
      await this.presentRepository.getOutboxOnePresentByUserNoPresentNo(
        userNo,
        presentNo,
      );

    return result;
  }

  async acceptOnePresent(userNo: number, presentNo: number) {
    /**
     * 아이템의 status상태가 read인 놈을 accept로 바꾸고
     *
     * inventory에 해당 아이템의 번호를 넣음
     *
     * 트랜잭션으로 한번에 넣을것.
     *
     *
     */
    const { status } = await this.presentRepository.getInboxPresentStatus(
      userNo,
      presentNo,
    );

    console.log(status);

    if (status === "unread" || "accept" || "reject") {
      throw new ForbiddenException("Present is already processed");
    }
    //여기부터 작업-----------------------------------------------------------------------------------
  }
}
