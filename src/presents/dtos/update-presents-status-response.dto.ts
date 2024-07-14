import { Prisma } from "@prisma/client";
import { PresentsRepository } from "../presents.repository";
import { presentDto } from "./present.dto";
import { Exclude } from "class-transformer";

type updateOnePresentStatusType = Prisma.PromiseReturnType<
  typeof PresentsRepository.prototype.updateOnePresentStatus
>;

export class UpdatePresentsStatusResponseDto extends presentDto<updateOnePresentStatusType> {
  constructor(present: updateOnePresentStatusType) {
    super(present);
  }

  @Exclude()
  senderDelete: boolean;
  @Exclude()
  receiverDelete: boolean;
}
