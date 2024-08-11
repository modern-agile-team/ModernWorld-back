import { Prisma } from "@prisma/client";
import { PresentsRepository } from "../presents.repository";
import { PresentDto } from "./present.dto";
import { Exclude } from "class-transformer";

type updateOnePresentStatusType = Prisma.PromiseReturnType<
  typeof PresentsRepository.prototype.updateOnePresentStatus
>;

export class PresentsWithoutDeleteResponseDto extends PresentDto<updateOnePresentStatusType> {
  constructor(present: updateOnePresentStatusType) {
    super(present);
  }

  @Exclude()
  senderDelete: boolean;
  @Exclude()
  receiverDelete: boolean;
}
