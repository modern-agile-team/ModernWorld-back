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
      {
        userNo: 2,
        itemNo: 5,
        status: false,
      },
      {
        userNo: 3,
        itemNo: 8,
        status: false,
      },
      {
        userNo: 3,
        itemNo: 12,
        status: false,
      },
      {
        userNo: 3,
        itemNo: 9,
        status: false,
      },
      {
        userNo: 4,
        itemNo: 10,
        status: false,
      },
      {
        userNo: 5,
        itemNo: 11,
        status: false,
      },
      {
        userNo: 3,
        itemNo: 12,
        status: false,
      },
      {
        userNo: 2,
        itemNo: 8,
        status: false,
      },
      {
        userNo: 7,
        itemNo: 2,
        status: false,
      },
      {
        userNo: 3,
        itemNo: 11,
        status: false,
      },
      {
        userNo: 5,
        itemNo: 8,
        status: false,
      },
      {
        userNo: 2,
        itemNo: 7,
        status: false,
      },
      {
        userNo: 2,
        itemNo: 7,
        status: false,
      },
    ],
  });
}
