import { PrismaClient } from "@prisma/client";

export async function achievement(prisma: PrismaClient) {
  for (let i = 1; i <= 24; i++) {
    const key = Math.floor(Math.random() * 3);
    const level = key === 0 ? "one" : key === 1 ? "two" : "three";

    await prisma.achievement.create({
      data: {
        name: `${i}번 업적`,
        description: `${i}번 업적 설명`,
        title: `${i}번 업적 칭호`,
        level,
        point: 100,
      },
    });
  }
}
