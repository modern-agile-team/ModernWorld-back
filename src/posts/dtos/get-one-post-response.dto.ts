import { Prisma } from "@prisma/client";
import { Exclude } from "class-transformer";
import { PostsRepository } from "../posts.repositroy";

type GetOnePostResponseType = Prisma.PromiseReturnType<
  typeof PostsRepository.prototype.getOnePostWithUser
>;

export class GetOnePostResponseDto {
  constructor(post: GetOnePostResponseType) {
    Object.assign(this, post);
  }

  no: number;
  content: string;
  check: boolean;
  createdAt: Date;
  @Exclude()
  senderDelete: boolean;
  @Exclude()
  receiverDelete: boolean;
  userPostSenderNo: {
    no: number;
    nickname: string;
  };
  userPostReceiverNo: {
    no: number;
    nickname: string;
  };
}
