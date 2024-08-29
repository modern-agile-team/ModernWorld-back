import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { CommentRepository } from "./comments.repository";
import { CommentContentDto } from "./dtos/comment-dtos/comment-content.dto";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { CommentsPaginationDto } from "./dtos/comment-dtos/comments-pagination.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { LegendsRepository } from "src/legends/legends.repository";
import { SseService } from "src/sse/sse.service";
import { AlarmsRepository } from "src/alarms/alarms.repository";
import { UserAchievementsService } from "src/user-achievements/user-achievements.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly legendsService: LegendsRepository,
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
    private readonly sseService: SseService,
    private readonly alarmsRepository: AlarmsRepository,
    private readonly userAchievementsService: UserAchievementsService,
  ) {}

  async createOneComment(
    receiverNo: number,
    senderNo: number,
    body: CommentContentDto,
  ) {
    const { content } = body;

    let comment: Prisma.PromiseReturnType<
      typeof this.commentRepository.createOneComment
    >;

    try {
      comment = await this.prisma.$transaction(async (tx) => {
        const comment = await this.commentRepository.createOneComment(
          receiverNo,
          senderNo,
          content,
          tx,
        );

        await this.legendsService.updateOneLegendByUserNo(
          senderNo,
          {
            commentCount: { increment: 1 },
          },
          tx,
        );

        await this.userAchievementsService.checkAchievementCondition(
          senderNo,
          "commentCount",
          tx,
        );

        await this.alarmsRepository.createOneAlarm(
          receiverNo,
          comment?.commentSender?.nickname,
          "방명록",
          tx,
        );

        return comment;
      });
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }

    this.sseService.sendSse(receiverNo, {
      title: "방명록",
      content: `${comment?.commentSender?.nickname}님이 방명록을 남겼습니다.`,
    });

    return comment;
  }

  async getManyComments(userNo: number, query: CommentsPaginationDto) {
    const { take, page, orderBy, type } = query;
    const skip = take * (page - 1);

    const where = type
      ? {
          [type]: userNo,
          deletedAt: null,
        }
      : {
          OR: [
            { senderNo: userNo, deletedAt: null },
            { receiverNo: userNo, deletedAt: null },
          ],
        };

    const totalCount =
      await this.commentRepository.countCommentsByUserNo(where);

    const totalPage = Math.ceil(totalCount / take);

    const comments = await this.commentRepository.getManyComments(
      skip,
      take,
      orderBy,
      where,
    );

    return { comments, page, take, totalCount, totalPage };
  }

  async updateOneComment(
    userNo: number,
    commentNo: number,
    body: CommentContentDto,
  ) {
    const { content } = body;
    const { commentSender } = await this.findOneCommentNotDeleted(commentNo);

    if (userNo !== commentSender?.no) {
      throw new ForbiddenException("User can update only their comment.");
    }

    return this.commentRepository.updateOneComment(commentNo, content);
  }

  async softDeleteOneComment(userNo: number, commentNo: number) {
    const { commentSender } = await this.findOneCommentNotDeleted(commentNo);

    if (userNo !== commentSender?.no) {
      throw new ForbiddenException("User can delete only their comment.");
    }

    return this.commentRepository.updateCommentToDelete(commentNo);
  }

  async createOneReply(
    commentNo: number,
    userNo: number,
    body: CommentContentDto,
  ) {
    await this.findOneCommentNotDeleted(commentNo);

    const { content } = body;

    try {
      return this.prisma.$transaction(async (tx) => {
        await this.legendsService.updateOneLegendByUserNo(
          userNo,
          {
            commentCount: { increment: 1 },
          },
          tx,
        );

        await this.userAchievementsService.checkAchievementCondition(
          userNo,
          "commentCount",
          tx,
        );

        return this.commentRepository.createOneReply(
          commentNo,
          userNo,
          content,
          tx,
        );
      });
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  async getOneReply(replyNo: number) {
    const reply = await this.findOneReplyNotDeleted(replyNo);

    await this.findOneCommentNotDeleted(reply.commentNo);

    return reply;
  }

  async getManyReplies(commentNo: number, query: PaginationDto) {
    await this.findOneCommentNotDeleted(commentNo);

    const { take, page, orderBy } = query;
    const skip = take * (page - 1);

    const where: Prisma.replyWhereInput = { commentNo, deletedAt: null };

    const totalCount =
      await this.commentRepository.countRepliesByCommentNo(where);

    const totalPage = Math.ceil(totalCount / take);

    const replies = await this.commentRepository.getManyReplies(
      skip,
      take,
      orderBy,
      where,
    );

    return { replies, page, take, totalCount, totalPage };
  }

  async updateOneReply(
    senderNo: number,
    commentNo: number,
    replyNo: number,
    body: CommentContentDto,
  ) {
    await this.findOneCommentNotDeleted(commentNo);

    const { user } = await this.findOneReplyNotDeleted(replyNo);

    const { content } = body;

    if (senderNo !== user?.no) {
      throw new ForbiddenException("User can update only their reply.");
    }

    return this.commentRepository.updateOneReply(replyNo, content);
  }

  async softDeleteOneReply(
    senderNo: number,
    commentNo: number,
    replyNo: number,
  ) {
    await this.findOneCommentNotDeleted(commentNo);

    const { user } = await this.findOneReplyNotDeleted(replyNo);

    if (senderNo !== user?.no) {
      throw new ForbiddenException("User can delete only their reply.");
    }

    await this.commentRepository.softDeleteOneReply(replyNo);
  }

  async findOneCommentNotDeleted(commentNo: number) {
    const comment =
      await this.commentRepository.findOneCommentNotDeleted(commentNo);

    if (!comment) {
      throw new NotFoundException("There is no comment with that number.");
    }

    return comment;
  }

  async findOneReplyNotDeleted(replyNo: number) {
    const reply = await this.commentRepository.findOneReplyNotDeleted(replyNo);

    if (!reply) {
      throw new NotFoundException("There is no reply with that number.");
    }

    return reply;
  }
}
