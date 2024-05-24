import { ForbiddenException, Injectable } from "@nestjs/common";
import { PostsRepository } from "./posts.repositroy";
import { SenderReceiverNoField } from "src/presents/enum/present-senderReceiverNo.enum";
import { createOnePostDto } from "./dto/create-post.dto";
import { UsersRepository } from "src/users/users.repository";

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

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

    if (senderNo === receiverNo) {
      throw new ForbiddenException("Users cannot post themselves alone.");
    }
  }

  deleteOnePost() {}
}
