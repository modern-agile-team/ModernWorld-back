import { post } from "@prisma/client";
import { Exclude } from "class-transformer";

export class GetOnePostDto {
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
