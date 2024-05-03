import { PrismaClient } from "@prisma/client";

export async function present(prisma: PrismaClient) {
  await prisma.present.createMany({
    data: [
      {
        itemNo: 1,
        senderNo: 1,
        receiverNo: 2,
        status: "unread",
        senderDelete: false,
        receiverDelete: false,
      },
      {
        itemNo: 1,
        senderNo: 5,
        receiverNo: 1,
        status: "unread",
        senderDelete: false,
        receiverDelete: false,
      },
      {
        itemNo: 1,
        senderNo: 2,
        receiverNo: 1,
        status: "unread",
        senderDelete: false,
        receiverDelete: false,
      },
      {
        itemNo: 2,
        senderNo: 3,
        receiverNo: 1,
        status: "unread",
        senderDelete: false,
        receiverDelete: false,
      },
      {
        itemNo: 3,
        senderNo: 4,
        receiverNo: 1,
        status: "unread",
        senderDelete: false,
        receiverDelete: false,
      },
      {
        itemNo: 4,
        senderNo: 1,
        receiverNo: 3,
        status: "unread",
        senderDelete: false,
        receiverDelete: false,
      },
      {
        itemNo: 1,
        senderNo: 5,
        receiverNo: 4,
        status: "unread",
        senderDelete: false,
        receiverDelete: false,
      },
      {
        itemNo: 2,
        senderNo: 3,
        receiverNo: 4,
        status: "unread",
        senderDelete: true,
        receiverDelete: false,
      },
      {
        itemNo: 3,
        senderNo: 4,
        receiverNo: 5,
        status: "unread",
        senderDelete: true,
        receiverDelete: false,
      },
    ],
  });
}
