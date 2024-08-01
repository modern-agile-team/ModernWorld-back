import { PrismaClient } from "@prisma/client";

export async function character(prisma: PrismaClient) {
  await prisma.character.createMany({
    data: [],
  });
}
