import { PresentStatus, Prisma } from "@prisma/client";
import { Exclude } from "class-transformer";
import { PresentsRepository } from "../presents.repository";

type getOnePresentDto = Prisma.PromiseReturnType<
  typeof PresentsRepository.prototype.getUserOnePresentWithItemUserInfo
>;

export class GetUserOnePresentResponseDto {
  constructor(present: getOnePresentDto) {
    Object.assign(this, present);
  }

  no: number;
  status: PresentStatus;
  createdAt: Date;
  @Exclude()
  senderDelete: boolean;
  @Exclude()
  receiverDelete: boolean;
  item: {
    name: string;
    image: string;
    description: string;
  };
  userPresentSenderNo: {
    no: number;
    nickname: string;
  };
  userPresentReceiverNo: {
    no: number;
    nickname: string;
  };
}
