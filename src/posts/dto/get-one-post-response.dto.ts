import { post, Prisma } from "@prisma/client";
import { Exclude } from "class-transformer";
import { PostsRepository } from "../posts.repositroy";

type GetOnePostResponseType = Prisma.PromiseReturnType<
  typeof PostsRepository.prototype.getOnePostByNo
>;

export class GetOnePostResponseDto {
  constructor(
    post: post & {
      userPostSenderNo: { nickname: string };
      userPostReceiverNo: { nickname: string };
    },
  ) {
    Object.assign(this, post);
  }

  no: number;
  senderNo: number;
  receiverNo: number;
  content: string;
  check: boolean;
  createdAt: Date;
  @Exclude()
  senderDelete: boolean;
  @Exclude()
  receiverDelete: boolean;
  userPostSenderNo: {
    nickname: string;
  };
  userPostReceiverNo: {
    nickname: string;
  };
}
