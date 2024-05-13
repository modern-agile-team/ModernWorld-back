import { Injectable } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { CommentRepository } from "./comment.repository";
import { comment } from "@prisma/client";

@Injectable()
export class CommentService {
  constructor(private readonly CommentRepository: CommentRepository) {}
  async commentCreate(receiver_no: number, sender_no: number, content: string) {
    const comment = await this.CommentRepository.createComment(
      receiver_no,
      sender_no,
      content,
    );
    return comment;
  }

  async findComment(senderNo: number, page: number) {
    const commentPage = (page - 1) * 2;
    const result = await this.CommentRepository.findComment(
      senderNo,
      commentPage,
    );
    return result;
  }

  async updateComment(id: number, content: string) {
    const result = await this.CommentRepository.updateComment(id, content);
    return result;
  }

  async softDeleteComment(id: number): Promise<comment> {
    const result = await this.CommentRepository.softDeleteComment(id);
    return result;
  }
}
