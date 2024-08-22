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
import { SseService } from "src/sse/sse.service";
import { AlarmsRepository } from "src/alarms/alarms.repository";
import { UserAchievementsService } from "src/user-achievements/user-achievements.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class LikesService {
  constructor(
    private readonly logger: Logger,
    private readonly prisma: PrismaService,
    private readonly likesRepository: LikesRepository,
    private readonly usersRepository: UsersRepository,
    private readonly legendsRepository: LegendsRepository,
    private readonly sseService: SseService,
    private readonly alarmsRepository: AlarmsRepository,
    private readonly userAchievementsService: UserAchievementsService,
  ) {}

  async createOneLike(senderNo: number, receiverNo: number) {
    if (!(await this.usersRepository.findUserByUserNo(receiverNo)))
      throw new NotFoundException("User doesn't exist.");

    if (senderNo === receiverNo)
      throw new ForbiddenException("Users can't like themselves alone.");

    if (await this.likesRepository.findOneLike(senderNo, receiverNo))
      throw new ConflictException("This like already exist.");

    let like: Prisma.PromiseReturnType<
      typeof this.likesRepository.createOneLike
    >;

    try {
      like = await this.prisma.$transaction(async (tx) => {
        const result = await this.likesRepository.createOneLike(
          senderNo,
          receiverNo,
          tx,
        );

        await this.legendsRepository.updateOneLegendByUserNo(
          receiverNo,
          {
            likeCount: { increment: 1 },
          },
          tx,
        );

        await this.alarmsRepository.createOneAlarm(
          receiverNo,
          `${result.userLikeSenderNo.nickname}님이 좋아요를 눌렀습니다.`,
          `좋아요`,
          tx,
        );

        await this.userAchievementsService.checkAchievementCondition(
          receiverNo,
          "likeCount",
          tx,
        );

        return result;
      });
    } catch (err) {
      this.logger.error(`transaction Error : ${err}`);
      throw new InternalServerErrorException();
    }

    this.sseService.sendSse(receiverNo, {
      title: "좋아요",
      content: `${like.userLikeSenderNo.nickname}님이 좋아요를 눌렀습니다.`,
    });

    return like;
  }

  async deleteOneLike(senderNo: number, receiverNo: number) {
    const like = await this.likesRepository.findOneLike(senderNo, receiverNo);

    if (!like) throw new NotFoundException("This like doesn't exist.");

    try {
      await this.prisma.$transaction([
        this.likesRepository.deleteOneLike(like.no),
        this.legendsRepository.updateOneLegendByUserNo(receiverNo, {
          likeCount: {
            increment: -1,
          },
        }),
      ]);
    } catch (err) {
      this.logger.error(`transaction Error : ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async findOneLike(senderNo: number, receiverNo: number) {
    return (await this.likesRepository.findOneLike(senderNo, receiverNo))
      ? true
      : false;
  }
}
