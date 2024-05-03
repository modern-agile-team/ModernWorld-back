import { PrismaClient } from "@prisma/client";

export async function neighbor(prisma: PrismaClient) {
  await prisma.neighbor.createMany({
    data: [
      {
        senderNo: 1,
        receiverNo: 2,
        status: false,
      },
      {
        senderNo: 1,
        receiverNo: 3,
        status: true,
      },
      {
        senderNo: 1,
        receiverNo: 4,
        status: false,
      },
      {
        senderNo: 2,
        receiverNo: 5,
        status: true,
      },
      {
        senderNo: 2,
        receiverNo: 6,
        status: false,
      },
      {
        senderNo: 2,
        receiverNo: 7,
        status: false,
      },
      {
        senderNo: 2,
        receiverNo: 3,
        status: false,
      },
    ],
  });
}
