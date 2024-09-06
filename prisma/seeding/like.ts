import { PrismaClient } from "@prisma/client";

export async function like(prisma: PrismaClient) {
  await prisma.like.createMany({
    data: [
      { receiverNo: 1, senderNo: 15 },
      { receiverNo: 1, senderNo: 23 },
      { receiverNo: 1, senderNo: 5 },
      { receiverNo: 1, senderNo: 8 },
      { receiverNo: 1, senderNo: 18 },
      { receiverNo: 1, senderNo: 7 },
      { receiverNo: 1, senderNo: 2 },

      { receiverNo: 2, senderNo: 11 },
      { receiverNo: 2, senderNo: 13 },
      { receiverNo: 2, senderNo: 27 },
      { receiverNo: 2, senderNo: 29 },
      { receiverNo: 2, senderNo: 16 },
      { receiverNo: 2, senderNo: 6 },
      { receiverNo: 2, senderNo: 9 },

      { receiverNo: 3, senderNo: 14 },
      { receiverNo: 3, senderNo: 22 },
      { receiverNo: 3, senderNo: 1 },
      { receiverNo: 3, senderNo: 20 },
      { receiverNo: 3, senderNo: 17 },

      { receiverNo: 4, senderNo: 12 },
      { receiverNo: 4, senderNo: 24 },
      { receiverNo: 4, senderNo: 21 },
      { receiverNo: 4, senderNo: 10 },

      { receiverNo: 5, senderNo: 25 },
      { receiverNo: 5, senderNo: 3 },
      { receiverNo: 5, senderNo: 30 },
      { receiverNo: 5, senderNo: 14 },
      { receiverNo: 5, senderNo: 19 },

      { receiverNo: 6, senderNo: 8 },
      { receiverNo: 6, senderNo: 18 },
      { receiverNo: 6, senderNo: 1 },
      { receiverNo: 6, senderNo: 5 },
      { receiverNo: 6, senderNo: 11 },

      { receiverNo: 7, senderNo: 9 },
      { receiverNo: 7, senderNo: 13 },
      { receiverNo: 7, senderNo: 2 },
      { receiverNo: 7, senderNo: 27 },

      { receiverNo: 8, senderNo: 4 },
      { receiverNo: 8, senderNo: 12 },
      { receiverNo: 8, senderNo: 6 },
      { receiverNo: 8, senderNo: 29 },

      { receiverNo: 9, senderNo: 15 },
      { receiverNo: 9, senderNo: 22 },
      { receiverNo: 9, senderNo: 17 },

      { receiverNo: 10, senderNo: 18 },
      { receiverNo: 10, senderNo: 23 },
      { receiverNo: 10, senderNo: 7 },

      { receiverNo: 11, senderNo: 30 },
      { receiverNo: 11, senderNo: 8 },
      { receiverNo: 11, senderNo: 4 },

      { receiverNo: 12, senderNo: 21 },
      { receiverNo: 12, senderNo: 16 },
      { receiverNo: 12, senderNo: 3 },

      { receiverNo: 13, senderNo: 19 },
      { receiverNo: 13, senderNo: 2 },
      { receiverNo: 13, senderNo: 26 },

      { receiverNo: 14, senderNo: 5 },
      { receiverNo: 14, senderNo: 27 },

      { receiverNo: 15, senderNo: 1 },
      { receiverNo: 15, senderNo: 7 },
      { receiverNo: 15, senderNo: 4 },

      { receiverNo: 16, senderNo: 30 },
      { receiverNo: 16, senderNo: 11 },

      { receiverNo: 17, senderNo: 23 },
      { receiverNo: 17, senderNo: 3 },

      { receiverNo: 18, senderNo: 9 },
      { receiverNo: 18, senderNo: 10 },

      { receiverNo: 19, senderNo: 22 },
      { receiverNo: 19, senderNo: 12 },

      { receiverNo: 20, senderNo: 6 },
      { receiverNo: 20, senderNo: 14 },

      { receiverNo: 21, senderNo: 2 },
      { receiverNo: 21, senderNo: 17 },

      { receiverNo: 22, senderNo: 13 },
      { receiverNo: 22, senderNo: 30 },

      { receiverNo: 23, senderNo: 15 },
      { receiverNo: 23, senderNo: 18 },

      { receiverNo: 24, senderNo: 7 },
      { receiverNo: 24, senderNo: 19 },

      { receiverNo: 25, senderNo: 6 },
      { receiverNo: 25, senderNo: 9 },

      { receiverNo: 26, senderNo: 11 },
      { receiverNo: 26, senderNo: 4 },

      { receiverNo: 27, senderNo: 1 },
      { receiverNo: 27, senderNo: 5 },

      { receiverNo: 28, senderNo: 2 },
      { receiverNo: 28, senderNo: 16 },

      { receiverNo: 29, senderNo: 10 },
      { receiverNo: 29, senderNo: 12 },

      { receiverNo: 30, senderNo: 3 },
      { receiverNo: 30, senderNo: 8 },
    ],
  });
}
