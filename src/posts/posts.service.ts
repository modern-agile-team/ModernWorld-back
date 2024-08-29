import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { PostsRepository } from "./posts.repositroy";
import { PostContentDto } from "./dtos/post-content.dto";
import { UsersRepository } from "src/users/users.repository";
import { GetPostsDto } from "./dtos/get-posts.dto";
import { Prisma, PrismaClient } from "@prisma/client";
import { SseService } from "src/sse/sse.service";
import { PrismaService } from "src/prisma/prisma.service";
import { AlarmsRepository } from "src/alarms/alarms.repository";

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly prisma: PrismaService,
    private readonly sseService: SseService,
    private readonly logger: Logger,
    private readonly alarmsRepository: AlarmsRepository,
  ) {}

  getUserPosts(userNo: number, query: GetPostsDto) {
    //해당 로직 GetUserPresents로직과 같음 (중복)
    const { type, orderBy } = query;

    const senderReceiverDeleteField =
      type === "receiverNo"
        ? "receiverDelete"
        : type === "senderNo"
          ? "senderDelete"
          : undefined;

    const where = type
      ? { [type]: userNo, [senderReceiverDeleteField]: false }
      : {
          OR: [
            { senderNo: userNo, senderDelete: false },
            { receiverNo: userNo, receiverDelete: false },
          ],
        };

    return this.postsRepository.getPosts(where, { no: orderBy });
  }

  async getOnePostByUserNo(userNo: number, postNo: number) {
    const post = await this.postsRepository.getOnePostWithUser(postNo);

    if (!post) {
      throw new NotFoundException("This post doesn't exist.");
    }

    const { userPostReceiverNo: receiver, userPostSenderNo: sender } = post;

    if (receiver?.no !== userNo && sender?.no !== userNo) {
      throw new ForbiddenException("This post is not related with user.");
    }

    if (userNo === receiver?.no && post.receiverDelete) {
      throw new NotFoundException("This post was deleted from receiver.");
    } else if (userNo === sender?.no && post.senderDelete) {
      throw new NotFoundException("This post was deleted from sender.");
    }

    if (receiver?.no === userNo && !post.check) {
      return this.postsRepository.updateOnePostCheckToTrue(postNo);
    }

    return post;
  }

  async createOnePost(
    senderNo: number,
    receiverNo: number,
    body: PostContentDto,
  ) {
    const { content } = body;

    if (senderNo === receiverNo) {
      throw new ForbiddenException("Users cannot post themselves alone.");
    }

    const user = await this.usersRepository.findUserByUserNo(receiverNo);

    if (!user) {
      throw new NotFoundException("Couldn't find receiver.");
    }

    let post: Prisma.PromiseReturnType<
      typeof this.postsRepository.createOnePost
    >;

    try {
      post = await this.prisma.$transaction(async (tx) => {
        const post = await this.postsRepository.createOnePost(
          senderNo,
          receiverNo,
          content,
          tx,
        );

        await this.alarmsRepository.createOneAlarm(
          receiverNo,
          `${post.userPostSenderNo.nickname}님께서 쪽지를 보냈습니다.`,
          "쪽지",
          tx,
        );

        return post;
      });
    } catch (err) {
      this.logger.error(`transaction Error : ${err}`);
      throw new InternalServerErrorException();
    }

    this.sseService.sendSse(receiverNo, {
      title: "쪽지",
      content: `${post.userPostSenderNo.nickname}님께서 쪽지를 보냈습니다.`,
    });

    return post;
  }

  async updateOnePostToDelete(userNo: number, postNo: number) {
    const post = await this.postsRepository.getOnePost(postNo);

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

    const senderReceiverDeleteField: Pick<
      Prisma.postUpdateInput,
      "receiverDelete" | "senderDelete"
    > = isSender ? { senderDelete: true } : { receiverDelete: true };

    return this.postsRepository.updateOnePostToDeleteByUser(
      postNo,
      senderReceiverDeleteField,
    );
  }
}
