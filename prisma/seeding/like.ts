import { PrismaClient } from "@prisma/client";

export async function like(prisma: PrismaClient) {
  await prisma.like.createMany({
    data: [
      { receiverNo: 1, senderNo: 2 },
      { receiverNo: 1, senderNo: 3 },
      { receiverNo: 1, senderNo: 4 },
      { receiverNo: 1, senderNo: 5 },
      { receiverNo: 1, senderNo: 6 },
      { receiverNo: 1, senderNo: 7 },
      { receiverNo: 1, senderNo: 8 },
      { receiverNo: 2, senderNo: 1 },
      { receiverNo: 2, senderNo: 3 },
      { receiverNo: 2, senderNo: 4 },
      { receiverNo: 2, senderNo: 5 },
      { receiverNo: 2, senderNo: 2 },
      { receiverNo: 3, senderNo: 1 },
      { receiverNo: 3, senderNo: 4 },
      { receiverNo: 3, senderNo: 5 },
      { receiverNo: 4, senderNo: 2 },
      { receiverNo: 5, senderNo: 1 },
      { receiverNo: 5, senderNo: 3 },
      { receiverNo: 5, senderNo: 4 },
      { receiverNo: 5, senderNo: 6 },
      { receiverNo: 5, senderNo: 2 },
      { receiverNo: 7, senderNo: 1 },
      { receiverNo: 7, senderNo: 5 },
      { receiverNo: 8, senderNo: 6 },
      { receiverNo: 9, senderNo: 7 },
    ],
  });
}
