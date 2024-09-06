import { PrismaClient } from "@prisma/client";

export async function inventory(prisma: PrismaClient) {
  for (let i = 1; i <= 36; i++) {
    await prisma.inventory.create({
      data: {
        userNo: 1,
        itemNo: i,
        status: false,
      },
    });
  }

  await prisma.inventory.createMany({
    data: [
      { userNo: 2, itemNo: 13, status: false },
      { userNo: 2, itemNo: 33, status: false },
      { userNo: 2, itemNo: 19, status: false },
      { userNo: 2, itemNo: 6, status: false },
      { userNo: 2, itemNo: 25, status: false },

      { userNo: 3, itemNo: 42, status: false },
      { userNo: 3, itemNo: 18, status: false },
      { userNo: 3, itemNo: 29, status: false },
      { userNo: 3, itemNo: 3, status: false },
      { userNo: 3, itemNo: 45, status: false },

      { userNo: 4, itemNo: 41, status: false },
      { userNo: 4, itemNo: 12, status: false },
      { userNo: 4, itemNo: 8, status: false },
      { userNo: 4, itemNo: 5, status: false },
      { userNo: 4, itemNo: 46, status: false },

      { userNo: 5, itemNo: 15, status: false },
      { userNo: 5, itemNo: 22, status: false },
      { userNo: 5, itemNo: 44, status: false },
      { userNo: 5, itemNo: 26, status: false },
      { userNo: 5, itemNo: 40, status: false },

      { userNo: 6, itemNo: 36, status: false },
      { userNo: 6, itemNo: 9, status: false },
      { userNo: 6, itemNo: 27, status: false },
      { userNo: 6, itemNo: 21, status: false },
      { userNo: 6, itemNo: 1, status: false },

      { userNo: 7, itemNo: 48, status: false },
      { userNo: 7, itemNo: 34, status: false },
      { userNo: 7, itemNo: 30, status: false },
      { userNo: 7, itemNo: 16, status: false },
      { userNo: 7, itemNo: 47, status: false },

      { userNo: 8, itemNo: 32, status: false },
      { userNo: 8, itemNo: 7, status: false },
      { userNo: 8, itemNo: 43, status: false },
      { userNo: 8, itemNo: 11, status: false },
      { userNo: 8, itemNo: 23, status: false },

      { userNo: 9, itemNo: 37, status: false },
      { userNo: 9, itemNo: 17, status: false },
      { userNo: 9, itemNo: 10, status: false },
      { userNo: 9, itemNo: 31, status: false },
      { userNo: 9, itemNo: 4, status: false },

      { userNo: 10, itemNo: 35, status: false },
      { userNo: 10, itemNo: 20, status: false },
      { userNo: 10, itemNo: 2, status: false },
      { userNo: 10, itemNo: 39, status: false },
      { userNo: 10, itemNo: 28, status: false },

      { userNo: 11, itemNo: 6, status: false },
      { userNo: 11, itemNo: 14, status: false },
      { userNo: 11, itemNo: 33, status: false },
      { userNo: 11, itemNo: 24, status: false },
      { userNo: 11, itemNo: 41, status: false },

      { userNo: 12, itemNo: 19, status: false },
      { userNo: 12, itemNo: 45, status: false },
      { userNo: 12, itemNo: 3, status: false },
      { userNo: 12, itemNo: 29, status: false },
      { userNo: 12, itemNo: 8, status: false },

      { userNo: 13, itemNo: 46, status: false },
      { userNo: 13, itemNo: 25, status: false },
      { userNo: 13, itemNo: 21, status: false },
      { userNo: 13, itemNo: 38, status: false },
      { userNo: 13, itemNo: 12, status: false },

      { userNo: 14, itemNo: 22, status: false },
      { userNo: 14, itemNo: 5, status: false },
      { userNo: 14, itemNo: 44, status: false },
      { userNo: 14, itemNo: 39, status: false },
      { userNo: 14, itemNo: 18, status: false },

      { userNo: 15, itemNo: 15, status: false },
      { userNo: 15, itemNo: 42, status: false },
      { userNo: 15, itemNo: 30, status: false },
      { userNo: 15, itemNo: 9, status: false },
      { userNo: 15, itemNo: 17, status: false },

      { userNo: 16, itemNo: 43, status: false },
      { userNo: 16, itemNo: 11, status: false },
      { userNo: 16, itemNo: 27, status: false },
      { userNo: 16, itemNo: 34, status: false },
      { userNo: 16, itemNo: 4, status: false },

      { userNo: 17, itemNo: 20, status: false },
      { userNo: 17, itemNo: 1, status: false },
      { userNo: 17, itemNo: 39, status: false },
      { userNo: 17, itemNo: 31, status: false },
      { userNo: 17, itemNo: 10, status: false },

      { userNo: 18, itemNo: 29, status: false },
      { userNo: 18, itemNo: 44, status: false },
      { userNo: 18, itemNo: 5, status: false },
      { userNo: 18, itemNo: 8, status: false },
      { userNo: 18, itemNo: 36, status: false },

      { userNo: 19, itemNo: 45, status: false },
      { userNo: 19, itemNo: 25, status: false },
      { userNo: 19, itemNo: 15, status: false },
      { userNo: 19, itemNo: 2, status: false },
      { userNo: 19, itemNo: 46, status: false },

      { userNo: 20, itemNo: 3, status: false },
      { userNo: 20, itemNo: 17, status: false },
      { userNo: 20, itemNo: 11, status: false },
      { userNo: 20, itemNo: 14, status: false },
      { userNo: 20, itemNo: 37, status: false },

      { userNo: 21, itemNo: 28, status: false },
      { userNo: 21, itemNo: 19, status: false },
      { userNo: 21, itemNo: 38, status: false },
      { userNo: 21, itemNo: 24, status: false },
      { userNo: 21, itemNo: 7, status: false },

      { userNo: 22, itemNo: 32, status: false },
      { userNo: 22, itemNo: 22, status: false },
      { userNo: 22, itemNo: 42, status: false },
      { userNo: 22, itemNo: 35, status: false },
      { userNo: 22, itemNo: 6, status: false },

      { userNo: 23, itemNo: 30, status: false },
      { userNo: 23, itemNo: 4, status: false },
      { userNo: 23, itemNo: 16, status: false },
      { userNo: 23, itemNo: 9, status: false },
      { userNo: 23, itemNo: 41, status: false },

      { userNo: 24, itemNo: 26, status: false },
      { userNo: 24, itemNo: 18, status: false },
      { userNo: 24, itemNo: 12, status: false },
      { userNo: 24, itemNo: 33, status: false },
      { userNo: 24, itemNo: 47, status: false },

      { userNo: 25, itemNo: 39, status: false },
      { userNo: 25, itemNo: 13, status: false },
      { userNo: 25, itemNo: 21, status: false },
      { userNo: 25, itemNo: 5, status: false },
      { userNo: 25, itemNo: 27, status: false },

      { userNo: 26, itemNo: 48, status: false },
      { userNo: 26, itemNo: 29, status: false },
      { userNo: 26, itemNo: 23, status: false },
      { userNo: 26, itemNo: 7, status: false },
      { userNo: 26, itemNo: 34, status: false },

      { userNo: 27, itemNo: 10, status: false },
      { userNo: 27, itemNo: 37, status: false },
      { userNo: 27, itemNo: 22, status: false },
      { userNo: 27, itemNo: 6, status: false },
      { userNo: 27, itemNo: 43, status: false },

      { userNo: 28, itemNo: 40, status: false },
      { userNo: 28, itemNo: 17, status: false },
      { userNo: 28, itemNo: 1, status: false },
      { userNo: 28, itemNo: 30, status: false },
      { userNo: 28, itemNo: 19, status: false },

      { userNo: 29, itemNo: 11, status: false },
      { userNo: 29, itemNo: 27, status: false },
      { userNo: 29, itemNo: 41, status: false },
      { userNo: 29, itemNo: 3, status: false },
      { userNo: 29, itemNo: 16, status: false },

      { userNo: 30, itemNo: 14, status: false },
      { userNo: 30, itemNo: 36, status: false },
      { userNo: 30, itemNo: 19, status: false },
      { userNo: 30, itemNo: 42, status: false },
      { userNo: 30, itemNo: 5, status: false },
    ],
  });
}
