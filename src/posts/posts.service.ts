import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PostsRepository } from "./posts.repositroy";
import { SenderReceiverNoField } from "src/presents/enum/present-senderReceiverNo.enum";
import { CreateOnePostDto } from "./dto/create-post.dto";
import { UsersRepository } from "src/users/users.repository";
import { GetOnePostDto } from "./dto/get-one-post.dto";

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

    let where = senderReceiverDeleteField
      ? {
          [senderReceiverNoField]: userNo,
          [senderReceiverDeleteField]: false,
        }
      : {
          OR: [
            { senderNo: userNo, senderDelete: false },
            { receiverNo: userNo, receiverDelete: false },
          ],
        };

    return this.postsRepository.getPosts(where);
  }

  async getOnePostByUserNo(userNo: number, postNo: number) {
    const post = await this.postsRepository.getOnePostWithUser(postNo);

    if (!post) {
      throw new NotFoundException("This post doesn't exist.");
    }

    if (userNo !== post.senderNo && userNo !== post.receiverNo) {
      throw new ForbiddenException("This post is not related with you.");
    }

    if (userNo === post.receiverNo) {
      if (post.receiverDelete) {
        throw new ForbiddenException("This post was deleted from receiver.");
      }
      // 수신자이면, 처음 조회할 경우 읽었다는걸 표시해야함
      if (!post.check) {
        await this.postsRepository.updateOnePostCheckToTrue(postNo);
        post.check = true;
      }
    } else if (post.senderDelete) {
      throw new ForbiddenException("This post was deleted from sender.");
      // 발신자이면 다른로직은 없음
    }

    return new GetOnePostDto(post);
  }

  async createOnePost(
    senderNo: number,
    receiverNo: number,
    body: CreateOnePostDto,
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
    } else if (receiverDelete) {
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
