import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
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

  getPostsByUserNo(
    userNo: number,
    senderReceiverNoField: SenderReceiverNoField,
  ) {
    const senderReceiverDeleteField =
      senderReceiverNoField === "receiverNo"
        ? "receiverDelete"
        : senderReceiverNoField === "senderNo"
          ? "senderDelete"
          : undefined;

    let where = {};

    if (senderReceiverDeleteField) {
      where = {
        [senderReceiverNoField]: userNo,
        [senderReceiverDeleteField]: false,
      };
    }
    return this.postsRepository.getPosts(where);
  }

  async getOnePostByUserNo(userNo: number, postNo: number) {
    const post = await this.postsRepository.getOnePostWithUserName(postNo);

    if (!post) {
      throw new NotFoundException("This post doesn't exist.");
    }

    if (userNo === post.receiverNo) {
      // 수신자이면, 처음 조회할 경우 읽었다는걸 표시해야함
      if (!post.check) {
        await this.postsRepository.updateOnePostCheckToTrue(postNo);
        post.check = true;
      }

      return post;
    } else if (userNo === post.senderNo) {
      // 발신자이면 다른로직은 없음
      return post;
    }
    throw new ForbiddenException("This post is not ralated with user.");
  }

  async createOnePost(
    senderNo: number,
    receiverNo: number,
    body: createOnePostDto,
  ) {
    const { content } = body;

    if (senderNo === receiverNo) {
      throw new ForbiddenException("Users cannot post themselves alone.");
    }

    const user =
      await this.usersRepository.findUserNicknameByUserNo(receiverNo);

    if (!user) {
      throw new NotFoundException("Couldn't find receiver.");
    }

    return this.postsRepository.createOnePost(senderNo, receiverNo, content);
  }

  async updateOnePostToDelete(userNo: number, postNo: number) {
    const post = await this.postsRepository.getOnePostByNo(postNo);

    if (!post) {
      throw new NotFoundException("This post doesn't exist.");
    }

    const { senderNo, receiverNo, senderDelete, receiverDelete } = post;

    if (userNo !== senderNo && userNo !== receiverNo) {
      throw new ForbiddenException("This post is not related with you.");
    }

    const isSender = userNo === senderNo;

    if (isSender && senderDelete) {
      throw new ConflictException("Already deleted from sender.");
    } else if (!isSender && receiverDelete) {
      throw new ConflictException("Already deleted from receiver.");
    }

    const senderReceiverDeleteField = isSender
      ? "senderDelete"
      : "receiverDelete";

    return this.postsRepository.updateOnePresentToDeleteByUser(
      postNo,
      senderReceiverDeleteField,
    );
  }
}
