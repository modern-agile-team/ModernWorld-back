import { ForbiddenException, Injectable } from "@nestjs/common";
import { PostsRepository } from "./posts.repositroy";
import { SenderReceiverNoField } from "src/presents/enum/present-senderReceiverNo.enum";
import { createOnePostDto } from "./dto/create-post.dto";

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  getPostsByUserNo(userNo: number, type: SenderReceiverNoField) {
    // return this.postsRepository.
  }

  getOnePostByUserNo(tokenUserNo: number, userNo: number, postNo: number) {
    if (tokenUserNo !== userNo) {
      throw new ForbiddenException("Users can only ready their posts.");
    }

    return this.postsRepository.getOnePost(postNo);
  }

  createOnePost(senderNo: number, receiverNo: number, body: createOnePostDto) {
    const { content } = body;
  }

  deleteOnePost() {}
}
