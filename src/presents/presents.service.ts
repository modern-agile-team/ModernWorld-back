import { Injectable } from "@nestjs/common";
import { PresentsRepository } from "./presents.repository";

@Injectable()
export class PresentsService {
  constructor(private readonly presentRepository: PresentsRepository) {}

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
}
