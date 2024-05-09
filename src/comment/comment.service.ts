import { Injectable } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { CommentRepository } from "./comment.repository";

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

  // findAll() {
  //   return `This action returns all comment`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} comment`;
  // }

  // update(id: number, updateCommentDto: UpdateCommentDto) {
  //   return `This action updates a #${id} comment`;
  // }

  async removeComment(id: number) {
    const result = await this.CommentRepository.removeComment(id);
    console.log(result);
    return result;
  }
}
