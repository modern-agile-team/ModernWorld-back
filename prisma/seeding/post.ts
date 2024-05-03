import { PrismaClient } from "@prisma/client";

export async function post(prisma: PrismaClient) {
  await prisma.post.createMany({
    data: [
      {
        senderNo: 1,
        receiverNo: 2,
        content: "엄준식비",
        check: false,
        senderDelete: false,
        receiverDelete: false,
      },
      {
        senderNo: 1,
        receiverNo: 3,
        content: "엄준식사",
        check: false,
        senderDelete: false,
        receiverDelete: false,
      },
      {
        senderNo: 1,
        receiverNo: 4,
        content: "엄준식수",
        check: false,
        senderDelete: false,
        receiverDelete: false,
      },
      {
        senderNo: 1,
        receiverNo: 5,
        content: "엄준식기",
        check: false,
        senderDelete: false,
        receiverDelete: false,
      },
      {
        senderNo: 2,
        receiverNo: 1,
        content: "왕덕봉봉",
        check: false,
        senderDelete: false,
        receiverDelete: false,
      },
      {
        senderNo: 3,
        receiverNo: 1,
        content: "왕덕봉덕",
        check: false,
        senderDelete: false,
        receiverDelete: false,
      },
      {
        senderNo: 4,
        receiverNo: 1,
        content: "왕닭발",
        check: false,
        senderDelete: false,
        receiverDelete: false,
      },
    ],
  });
}
