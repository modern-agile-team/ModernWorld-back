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
}
