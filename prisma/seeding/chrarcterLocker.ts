import { PrismaClient } from "@prisma/client";

export async function characterLocker(prisma: PrismaClient) {
  await prisma.characterLocker.createMany({
    data: [
      { characterNo: 1, userNo: 1, status: true },
      { characterNo: 2, userNo: 1, status: false },
      { characterNo: 3, userNo: 1, status: false },
      { characterNo: 4, userNo: 1, status: false },
      { characterNo: 5, userNo: 1, status: false },
      { characterNo: 6, userNo: 1, status: false },
      { characterNo: 7, userNo: 1, status: false },
      { characterNo: 8, userNo: 1, status: false },
      { characterNo: 9, userNo: 1, status: false },
      { characterNo: 10, userNo: 1, status: false },
      { characterNo: 11, userNo: 1, status: false },
      { characterNo: 12, userNo: 1, status: false },

      { characterNo: 2, userNo: 2, status: true },
      { characterNo: 3, userNo: 2, status: false },
      { characterNo: 4, userNo: 2, status: false },
      { characterNo: 5, userNo: 2, status: false },
      { characterNo: 6, userNo: 2, status: false },
      { characterNo: 7, userNo: 2, status: false },
      { characterNo: 8, userNo: 2, status: false },
      { characterNo: 9, userNo: 2, status: false },

      { characterNo: 2, userNo: 3, status: true },
      { characterNo: 1, userNo: 3, status: false },
      { characterNo: 3, userNo: 3, status: false },
      { characterNo: 8, userNo: 3, status: false },

      { characterNo: 3, userNo: 4, status: true },
      { characterNo: 1, userNo: 4, status: false },
      { characterNo: 9, userNo: 4, status: false },
      { characterNo: 4, userNo: 4, status: false },

      { characterNo: 3, userNo: 5, status: true },
      { characterNo: 1, userNo: 5, status: false },

      { characterNo: 3, userNo: 6, status: true },
      { characterNo: 1, userNo: 6, status: false },
      { characterNo: 7, userNo: 6, status: false },
      { characterNo: 9, userNo: 6, status: false },
      { characterNo: 6, userNo: 6, status: false },

      { characterNo: 4, userNo: 7, status: true },
      { characterNo: 2, userNo: 7, status: false },
      { characterNo: 1, userNo: 7, status: false },
      { characterNo: 5, userNo: 7, status: false },
      { characterNo: 6, userNo: 7, status: false },

      { characterNo: 4, userNo: 8, status: true },
      { characterNo: 2, userNo: 8, status: false },
      { characterNo: 3, userNo: 8, status: false },
      { characterNo: 5, userNo: 8, status: false },

      { characterNo: 4, userNo: 9, status: true },
      { characterNo: 1, userNo: 9, status: false },
      { characterNo: 7, userNo: 9, status: false },
      { characterNo: 8, userNo: 9, status: false },

      { characterNo: 2, userNo: 10, status: true },
      { characterNo: 11, userNo: 10, status: false },
      { characterNo: 12, userNo: 10, status: false },
      { characterNo: 13, userNo: 10, status: false },

      { characterNo: 2, userNo: 11, status: true },
      { characterNo: 3, userNo: 12, status: true },
      { characterNo: 3, userNo: 13, status: true },
      { characterNo: 7, userNo: 14, status: true },
      { characterNo: 8, userNo: 15, status: true },
      { characterNo: 7, userNo: 16, status: true },
      { characterNo: 5, userNo: 17, status: true },
      { characterNo: 10, userNo: 18, status: true },
      { characterNo: 4, userNo: 19, status: true },
      { characterNo: 3, userNo: 20, status: true },
      { characterNo: 2, userNo: 21, status: true },
      { characterNo: 4, userNo: 22, status: true },
      { characterNo: 9, userNo: 23, status: true },
      { characterNo: 8, userNo: 24, status: true },
      { characterNo: 8, userNo: 25, status: true },
    ],
  });
}
