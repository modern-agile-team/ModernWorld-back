import { PrismaClient } from "@prisma/client";

export async function item(prisma: PrismaClient) {
  for (let i = 1; i <= 36; i++) {
    const theme = i <= 12 ? "여름" : i > 12 && i <= 24 ? "가을" : "겨울";
    const type = i <= 12 ? i : i % 12 === 0 ? 12 : i % 12;

    await prisma.item.create({
      data: {
        name: `${i}번 아이템`,
        description: `${i}번 아이템 설명`,
        image: `${i}번 아이템 이미지`,

        theme: `${theme} 테마`,
        type: `${type}번 타입`,
        price: 100,
      },
    });
  }
}
