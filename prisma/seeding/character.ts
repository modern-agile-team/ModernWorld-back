import { PrismaClient } from "@prisma/client";

const BASE_URL = process.env.S3_BASE_URL;

export async function character(prisma: PrismaClient) {
  await prisma.character.createMany({
    data: [
      {
        name: "김은우검은고양이",
        description: "",
        image:
          BASE_URL +
          "/items/%EC%BA%90%EB%A6%AD%ED%84%B0%EB%AA%A8%EC%9D%8C/%EA%B9%80%EC%9D%80%EC%9A%B0%EA%B2%80%EC%9D%80%EA%B3%A0%EC%96%91%EC%9D%B4.svg",
        species: "cat",
        price: 1000,
      },

      {
        name: "시작강아지",
        description: "",
        image:
          BASE_URL +
          "/items/%EC%BA%90%EB%A6%AD%ED%84%B0%EB%AA%A8%EC%9D%8C/%EC%8B%9C%EC%9E%91%EA%B0%95%EC%95%84%EC%A7%80.svg",
        species: "dog",
        price: 1000,
      },

      {
        name: "시작고양이",
        description: "",
        image:
          BASE_URL +
          "/items/%EC%BA%90%EB%A6%AD%ED%84%B0%EB%AA%A8%EC%9D%8C/%EC%8B%9C%EC%9E%91%EA%B3%A0%EC%96%91%EC%9D%B4.svg",
        species: "cat",
        price: 1000,
      },

      {
        name: "안진우똥색강아지",
        description: "",
        image:
          BASE_URL +
          "/items/%EC%BA%90%EB%A6%AD%ED%84%B0%EB%AA%A8%EC%9D%8C/%EC%95%88%EC%A7%84%EC%9A%B0%EB%98%A5%EC%83%89%EA%B0%95%EC%95%84%EC%A7%80.svg",
        species: "dog",
        price: 1000,
      },

      {
        name: "안진우회색고양이",
        description: "",
        image:
          BASE_URL +
          "/items/%EC%BA%90%EB%A6%AD%ED%84%B0%EB%AA%A8%EC%9D%8C/%EC%95%88%EC%A7%84%EC%9A%B0%ED%9A%8C%EC%83%89%EA%B3%A0%EC%96%91%EC%9D%B4.svg",
        species: "cat",
        price: 1000,
      },

      {
        name: "조영은회색강아지",
        description: "",
        image:
          BASE_URL +
          "/items/%EC%BA%90%EB%A6%AD%ED%84%B0%EB%AA%A8%EC%9D%8C/%EC%A1%B0%EC%98%81%EC%9D%80%ED%9A%8C%EC%83%89%EA%B0%95%EC%95%84%EC%A7%80.svg",
        species: "dog",
        price: 1000,
      },

      {
        name: "에이리언고양이",
        description: "",
        image:
          BASE_URL +
          "/items/%EC%BA%90%EB%A6%AD%ED%84%B0%EB%AA%A8%EC%9D%8C/AlienCat.svg",
        species: "cat",
        price: 1000,
      },

      {
        name: "탄강아지",
        description: "",
        image:
          BASE_URL +
          "/items/%EC%BA%90%EB%A6%AD%ED%84%B0%EB%AA%A8%EC%9D%8C/burnDog.svg",
        species: "dog",
        price: 1000,
      },

      // {
      //   name: "고양이",
      //   description: "",
      //   image: BASE_URL + "/",
      //   species: "cat",
      //   price: 1000,
      // },

      // {
      //   name: "강아지",
      //   description: "",
      //   image: BASE_URL + "/",
      //   species: "dog",
      //   price: 1000,
      // },

      // {
      //   name: "고양이",
      //   description: "",
      //   image: BASE_URL + "/",
      //   species: "cat",
      //   price: 1000,
      // },

      // {
      //   name: "강아지",
      //   description: "",
      //   image: BASE_URL + "/",
      //   species: "dog",
      //   price: 1000,
      // },

      // {
      //   name: "고양이",
      //   description: "",
      //   image: BASE_URL + "/",
      //   species: "cat",
      //   price: 1000,
      // },

      // {
      //   name: "강아지",
      //   description: "",
      //   image: BASE_URL + "/",
      //   species: "dog",
      //   price: 1000,
      // },

      // {
      //   name: "고양이",
      //   description: "",
      //   image: BASE_URL + "/",
      //   species: "cat",
      //   price: 1000,
      // },

      // {
      //   name: "강아지",
      //   description: "",
      //   image: BASE_URL + "/",
      //   species: "dog",
      //   price: 1000,
      // },
    ],
  });
}
