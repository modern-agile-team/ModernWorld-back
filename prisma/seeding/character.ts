import { PrismaClient } from "@prisma/client";

export async function character(prisma: PrismaClient) {
  for (let i = 1; i <= 32; i++) {
    const key = Math.floor(Math.random() * 2);
    const species = key === 0 ? "cat" : "dog";

    await prisma.character.create({
      data: {
        name: `${i}번 ${species} 이름`,
        description: `${i}번 ${species} 설명`,
        image: `${i}번 ${species} 이미지`,
        species,
        price: 100,
      },
    });
  }
}
