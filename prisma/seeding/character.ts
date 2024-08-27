import { PrismaClient } from "@prisma/client";

const BASE_URL = process.env.S3_BASE_URL;

export async function character(prisma: PrismaClient) {
  await prisma.character.createMany({
    data: [
      {
        name: "고양이",
        description: "",
        image: BASE_URL + "/",
        species: "cat",
        price: 100,
      },

      {
        name: "강아지",
        description: "",
        image: BASE_URL + "/",
        species: "dog",
        price: 100,
      },

      {
        name: "고양이",
        description: "",
        image: BASE_URL + "/",
        species: "cat",
        price: 100,
      },

      {
        name: "강아지",
        description: "",
        image: BASE_URL + "/",
        species: "dog",
        price: 100,
      },

      {
        name: "고양이",
        description: "",
        image: BASE_URL + "/",
        species: "cat",
        price: 100,
      },

      {
        name: "강아지",
        description: "",
        image: BASE_URL + "/",
        species: "dog",
        price: 100,
      },

      {
        name: "고양이",
        description: "",
        image: BASE_URL + "/",
        species: "cat",
        price: 100,
      },

      {
        name: "강아지",
        description: "",
        image: BASE_URL + "/",
        species: "dog",
        price: 100,
      },

      {
        name: "고양이",
        description: "",
        image: BASE_URL + "/",
        species: "cat",
        price: 100,
      },

      {
        name: "강아지",
        description: "",
        image: BASE_URL + "/",
        species: "dog",
        price: 100,
      },

      {
        name: "고양이",
        description: "",
        image: BASE_URL + "/",
        species: "cat",
        price: 100,
      },

      {
        name: "강아지",
        description: "",
        image: BASE_URL + "/",
        species: "dog",
        price: 100,
      },

      {
        name: "고양이",
        description: "",
        image: BASE_URL + "/",
        species: "cat",
        price: 100,
      },

      {
        name: "강아지",
        description: "",
        image: BASE_URL + "/",
        species: "dog",
        price: 100,
      },

      {
        name: "고양이",
        description: "",
        image: BASE_URL + "/",
        species: "cat",
        price: 100,
      },

      {
        name: "강아지",
        description: "",
        image: BASE_URL + "/",
        species: "dog",
        price: 100,
      },
    ],
  });
}
