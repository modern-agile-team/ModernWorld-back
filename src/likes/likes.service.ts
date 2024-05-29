import { Injectable, NotFoundException } from "@nestjs/common";
import { LikesRepository } from "./likes.repository";

@Injectable()
export class LikesService {
  constructor(private readonly likesRepository: LikesRepository) {}

  async createOneLike(senderNo: number, receiverNo: number) {
    if (await this.likesRepository.findOneLike(senderNo, receiverNo)) {
      throw new NotFoundException("sonanda..");
    }
    return this.likesRepository.createOneLike(senderNo, receiverNo);
  }

  deleteOneLike(senderNo: number, receiverNo: number) {}
}
