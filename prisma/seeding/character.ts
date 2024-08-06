import { PrismaClient } from "@prisma/client";

export async function character(prisma: PrismaClient) {
  await prisma.character.createMany({
    data: [
      {
        name: "고양이",
        description: "",
        image: "",
        species: "cat",
        price: 100,
      },

      {
        name: "강아지",
        description: "",
        image: "",
        species: "dog",
        price: 100,
      },

      {
        name: "고양이",
        description: "",
        image: "",
        species: "cat",
        price: 100,
      },

      {
        name: "강아지",
        description: "",
        image: "",
        species: "dog",
        price: 100,
      },

      {
        name: "고양이",
        description: "",
        image: "",
        species: "cat",
        price: 100,
      },

      {
        name: "강아지",
        description: "",
        image: "",
        species: "dog",
        price: 100,
      },

      {
        name: "고양이",
        description: "",
        image: "",
        species: "cat",
        price: 100,
      },

      {
        name: "강아지",
        description: "",
        image: "",
        species: "dog",
        price: 100,
      },

      {
        name: "고양이",
        description: "",
        image: "",
        species: "cat",
        price: 100,
      },

      {
        name: "강아지",
        description: "",
        image: "",
        species: "dog",
        price: 100,
      },

      {
        name: "고양이",
        description: "",
        image: "",
        species: "cat",
        price: 100,
      },

      {
        name: "강아지",
        description: "",
        image: "",
        species: "dog",
        price: 100,
      },

      {
        name: "고양이",
        description: "",
        image: "",
        species: "cat",
        price: 100,
      },

      {
        name: "강아지",
        description: "",
        image: "",
        species: "dog",
        price: 100,
      },

      {
        name: "고양이",
        description: "",
        image: "",
        species: "cat",
        price: 100,
      },

      {
        name: "강아지",
        description: "",
        image: "",
        species: "dog",
        price: 100,
      },
    ],
  });
}
