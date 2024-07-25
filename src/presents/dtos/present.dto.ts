import { PresentStatus } from "@prisma/client";

export class presentDto<T> {
  constructor(present: T) {
    Object.assign(this, present);
  }

  no: number;
  itemNo: number;
  senderNo: number | null;
  receiverNo: number | null;
  createdAt: Date;
  status: PresentStatus;
  senderDelete: boolean;
  receiverDelete: boolean;
}
