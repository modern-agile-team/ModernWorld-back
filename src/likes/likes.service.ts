import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { LikesRepository } from "./likes.repository";
import { UsersRepository } from "src/users/users.repository";
import { LegendsRepository } from "src/legends/legends.repository";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class LikesService {
  constructor(
    private readonly logger: Logger,
    private readonly prisma: PrismaService,
    private readonly likesRepository: LikesRepository,
    private readonly usersRepository: UsersRepository,
    private readonly legendsRepository: LegendsRepository,
  ) {}

  async createOneLike(senderNo: number, receiverNo: number) {
    if (!(await this.usersRepository.findUserNicknameByUserNo(receiverNo)))
      throw new NotFoundException("User doesn't exist.");

    if (senderNo === receiverNo)
      throw new ForbiddenException("Users can't like themselves alone.");

    if (await this.likesRepository.findOneLike(senderNo, receiverNo))
      throw new ConflictException("This like already exist.");

    try {
      const [, result] = await this.prisma.$transaction([
        this.likesRepository.createOneLike(senderNo, receiverNo),
        this.legendsRepository.updateOneLegendByUserNo(receiverNo, {
          likeCount: { increment: 1 },
        }),
      ]);

      return result;
    } catch (err) {
      this.logger.error(`transaction Error : ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async deleteOneLike(senderNo: number, receiverNo: number) {
    const { no } = await this.likesRepository.findOneLike(senderNo, receiverNo);

    if (!no) throw new NotFoundException("This like doesn't exist.");

    try {
      const [, result] = await this.prisma.$transaction([
        this.likesRepository.deleteOneLike(no),
        this.legendsRepository.updateOneLegendByUserNo(receiverNo, {
          likeCount: {
            increment: -1,
          },
        }),
      ]);

      return result;
    } catch (err) {
      this.logger.error(`transaction Error : ${err}`);
      throw new InternalServerErrorException();
    }
  }
}
