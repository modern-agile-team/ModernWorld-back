import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { LikesRepository } from "./likes.repository";
import { UsersRepository } from "src/users/users.repository";
import { LegendsRepository } from "src/legends/legends.repository";
import { CreateOneLikeDto } from "./dtos/create-one-like.dto";
import { DeleteOneLikeDto } from "./dtos/delete-one-like.dto";

@Injectable()
export class LikesService {
  constructor(
    private readonly likesRepository: LikesRepository,
    private readonly usersRepository: UsersRepository,
    private readonly legendsRepository: LegendsRepository,
  ) {}

  async createOneLike(senderNo: number, body: CreateOneLikeDto) {
    const { receiverNo } = body;

    if (!(await this.usersRepository.findUserNicknameByUserNo(receiverNo)))
      throw new NotFoundException("User doesn't exist.");

    if (senderNo === receiverNo)
      throw new ForbiddenException("Users can't like themselves alone.");

    if (await this.likesRepository.findOneLike(senderNo, receiverNo))
      throw new ConflictException("This like already exist.");

    //트랜잭션으로 묶을것.

    await this.legendsRepository.updateOneLegendByUserNo(receiverNo, {
      likeCount: { increment: 1 },
    });

    return this.likesRepository.createOneLike(senderNo, receiverNo);
  }

  async deleteOneLike(senderNo: number, body: DeleteOneLikeDto) {
    const { receiverNo } = body;

    if (!(await this.likesRepository.findOneLike(senderNo, receiverNo)))
      throw new NotFoundException("This like doesn't exist.");

    //트랜잭션 묶을것.

    await this.legendsRepository.updateOneLegendByUserNo(receiverNo, {
      likeCount: {
        increment: -1,
      },
    });

    return this.likesRepository.deleteOneLike(senderNo, receiverNo);
  }
}
