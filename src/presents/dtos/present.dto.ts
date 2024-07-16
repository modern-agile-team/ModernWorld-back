import { present_status } from "@prisma/client";

export class presentDto<T> {
  constructor(present: T) {
    Object.assign(this, present);
  }

  no: number;
  itemNo: number;
  senderNo: number | null;
  receiverNo: number | null;
  createdAt: Date;
  status: present_status;
  senderDelete: boolean;
  receiverDelete: boolean;
}
