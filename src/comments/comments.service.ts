import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CommentRepository } from "./comments.repository";
import { CreateCommentDto } from "./dtos/comment-dtos/create-comment.dto";
import { UpdateCommentDto } from "./dtos/comment-dtos/update-comment.dto";
import { GetCommentDto } from "./dtos/comment-dtos/get-comment.dto";
import { GetReplyDto } from "./dtos/replies-dtos/get-reply.dto";

@Injectable()
export class CommentService {
  constructor(private readonly CommentRepository: CommentRepository) {}
  createOneComment(
    receiverNo: number,
    senderNo: number,
    createcontent: CreateCommentDto,
  ) {
    const { content } = createcontent;

    return this.CommentRepository.createOneComment(
      receiverNo,
      senderNo,
      content,
    );
  }

  getManyComments(receiverNo: number, queryParams: GetCommentDto) {
    const { page, take } = queryParams;
    if (page < 0 || take < 0) {
      throw new BadRequestException(
        "현재 페이지 수와 가지고 올 댓글의 수는 양수이어야 합니다.",
      );
    }
    const skip = (page - 1) * take;
    return this.CommentRepository.getManyComments(receiverNo, skip, take);
  }

  async updateOneComment(commentNo: number, createcontent: UpdateCommentDto) {
    const { content } = createcontent;
    const comment = await this.CommentRepository.getOneComment(commentNo);
    if (!comment) {
      throw new NotFoundException("해당 방명록을 찾을 수 없습니다.");
    }
    return this.CommentRepository.updateOneComment(commentNo, content);
  }

  async softDeleteOneComment(commentNo: number) {
    const comment = await this.CommentRepository.getOneComment(commentNo);
    if (!comment) {
      throw new NotFoundException("해당 방명록을 찾을 수 없습니다.");
    }
    return this.CommentRepository.softDeleteOneComment(commentNo);
  }

  async createOneReply(
    commentNo: number,
    userNo: number,
    createContent: CreateCommentDto,
  ) {
    const { content } = createContent;
    const comment = await this.CommentRepository.getOneComment(commentNo);
    if (!comment) {
      throw new NotFoundException("해당 방명록은 존재하지 않습니다.");
    }
    return this.CommentRepository.createOneReply(commentNo, userNo, content);
  }

  async getManyReplies(commentNo: number, queryParams: GetReplyDto) {
    const { page, take } = queryParams;
    const comment = await this.CommentRepository.getOneComment(commentNo);
    if (!comment) {
      throw new NotFoundException("해당 방명록은 존재하지 않습니다.");
    }
    if (page < 0 || take < 0) {
      throw new BadRequestException(
        "현재 페이지 수와 가지고 올 댓글의 수는 양수이어야 합니다.",
      );
    }
    const skip = (page - 1) * take;
    return this.CommentRepository.getManyReplies(commentNo, skip, take);
  }

  async updateOneReply(replyNo: number, replyContent: UpdateCommentDto) {
    const { content } = replyContent;
    const reply = await this.CommentRepository.getOneComment(replyNo);
    if (!reply) {
      throw new NotFoundException("해당 댓글을 찾을 수 없습니다.");
    }
    return await this.CommentRepository.updateOneReply(replyNo, content);
  }

  async softDeleteOneReply(replyNo: number) {
    const reply = await this.CommentRepository.getOneComment(replyNo);
    if (!reply) {
      throw new NotFoundException("해당 댓글을 찾을 수 없습니다.");
    }
    return await this.CommentRepository.softDeleteOneReply(replyNo);
  }
}
