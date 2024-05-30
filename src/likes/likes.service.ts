import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { LikesRepository } from "./likes.repository";
import { UsersRepository } from "src/users/users.repository";

@Injectable()
export class LikesService {
  constructor(
    private readonly likesRepository: LikesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async createOneLike(senderNo: number, receiverNo: number) {
    if (!(await this.usersRepository.findUserNicknameByUserNo(receiverNo)))
      throw new NotFoundException("User doens't exist.");

    if (senderNo === receiverNo)
      throw new ForbiddenException("Users can't like themselves alone.");

    if (await this.likesRepository.findOneLike(senderNo, receiverNo))
      throw new NotFoundException("This like already exist.");

    return this.likesRepository.createOneLike(senderNo, receiverNo);
  }

  deleteOneLike(senderNo: number, receiverNo: number) {
    return this.likesRepository.deleteOneLike(senderNo, receiverNo);
  }
}
