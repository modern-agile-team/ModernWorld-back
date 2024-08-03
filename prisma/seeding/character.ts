import { PrismaClient } from "@prisma/client";

export async function character(prisma: PrismaClient) {
  await prisma.character.createMany({
    data: [
      { name: "", description: "", image: "", species: "cat", price: 100 },
      { name: "", description: "", image: "", species: "dog", price: 100 },
      { name: "", description: "", image: "", species: "cat", price: 100 },
      { name: "", description: "", image: "", species: "dog", price: 100 },
      { name: "", description: "", image: "", species: "cat", price: 100 },
      { name: "", description: "", image: "", species: "dog", price: 100 },
      { name: "", description: "", image: "", species: "cat", price: 100 },
      { name: "", description: "", image: "", species: "dog", price: 100 },
      { name: "", description: "", image: "", species: "cat", price: 100 },
      { name: "", description: "", image: "", species: "dog", price: 100 },
      { name: "", description: "", image: "", species: "cat", price: 100 },
      { name: "", description: "", image: "", species: "dog", price: 100 },
      { name: "", description: "", image: "", species: "dog", price: 100 },
      { name: "", description: "", image: "", species: "cat", price: 100 },
      { name: "", description: "", image: "", species: "dog", price: 100 },
      { name: "", description: "", image: "", species: "cat", price: 100 },
    ],
  });
}
