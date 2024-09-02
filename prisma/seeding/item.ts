import { PrismaClient } from "@prisma/client";

const BASE_URL = process.env.S3_BASE_URL;

export function item(prisma: PrismaClient) {
  return prisma.item.createMany({
    data: [
      // 봄 테마
      {
        no: 1,
        name: "1번 아이템",
        description: "1번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/grandfatherclock.svg",
        theme: "봄 테마",
        type: "1번 타입",
        price: 1000,
      },
      {
        no: 2,
        name: "2번 아이템",
        description: "2번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/pinkrug.svg",
        theme: "봄 테마",
        type: "2번 타입",
        price: 1000,
      },
      {
        no: 3,
        name: "3번 아이템",
        description: "3번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/beardoll.svg",
        theme: "봄 테마",
        type: "3번 타입",
        price: 1000,
      },
      {
        no: 4,
        name: "4번 아이템",
        description: "4번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/monitor.svg",
        theme: "봄 테마",
        type: "4번 타입",
        price: 1000,
      },
      {
        no: 5,
        name: "5번 아이템",
        description: "5번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/yellowsofa.svg",
        theme: "봄 테마",
        type: "5번 타입",
        price: 1000,
      },
      {
        no: 6,
        name: "6번 아이템",
        description: "6번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/bluerug.svg",
        theme: "봄 테마",
        type: "6번 타입",
        price: 1000,
      },
      {
        no: 7,
        name: "7번 아이템",
        description: "7번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/window.svg",
        theme: "봄 테마",
        type: "7번 타입",
        price: 1000,
      },
      {
        no: 8,
        name: "8번 아이템",
        description: "8번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/monalisa.svg",
        theme: "봄 테마",
        type: "8번 타입",
        price: 1000,
      },
      {
        no: 9,
        name: "9번 아이템",
        description: "9번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/table.svg",
        theme: "봄 테마",
        type: "9번 타입",
        price: 1000,
      },
      {
        no: 10,
        name: "10번 아이템",
        description: "10번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/woodchair.svg",
        theme: "봄 테마",
        type: "10번 타입",
        price: 1000,
      },
      {
        no: 11,
        name: "11번 아이템",
        description: "11번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/beardoll.svg",
        theme: "봄 테마",
        type: "11번 타입",
        price: 1000,
      },
      {
        no: 12,
        name: "12번 아이템",
        description: "12번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/pinkrug.svg",
        theme: "봄 테마",
        type: "12번 타입",
        price: 1000,
      },

      // 여름 테마
      {
        no: 13,
        name: "13번 아이템",
        description: "13번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/monitor.svg",
        theme: "여름 테마",
        type: "1번 타입",
        price: 1000,
      },
      {
        no: 14,
        name: "14번 아이템",
        description: "14번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/window.svg",
        theme: "여름 테마",
        type: "2번 타입",
        price: 1000,
      },
      {
        no: 15,
        name: "15번 아이템",
        description: "15번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/woodchair.svg",
        theme: "여름 테마",
        type: "3번 타입",
        price: 1000,
      },
      {
        no: 16,
        name: "16번 아이템",
        description: "16번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/yellowsofa.svg",
        theme: "여름 테마",
        type: "4번 타입",
        price: 1000,
      },
      {
        no: 17,
        name: "17번 아이템",
        description: "17번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/monalisa.svg",
        theme: "여름 테마",
        type: "5번 타입",
        price: 1000,
      },
      {
        no: 18,
        name: "18번 아이템",
        description: "18번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/monitor.svg",
        theme: "여름 테마",
        type: "6번 타입",
        price: 1000,
      },
      {
        no: 19,
        name: "19번 아이템",
        description: "19번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/table.svg",
        theme: "여름 테마",
        type: "7번 타입",
        price: 1000,
      },
      {
        no: 20,
        name: "20번 아이템",
        description: "20번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/woodchair.svg",
        theme: "여름 테마",
        type: "8번 타입",
        price: 1000,
      },
      {
        no: 21,
        name: "21번 아이템",
        description: "21번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/monitor.svg",
        theme: "여름 테마",
        type: "9번 타입",
        price: 1000,
      },
      {
        no: 22,
        name: "22번 아이템",
        description: "22번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/monalisa.svg",
        theme: "여름 테마",
        type: "10번 타입",
        price: 1000,
      },
      {
        no: 23,
        name: "23번 아이템",
        description: "23번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/monitor.svg",
        theme: "여름 테마",
        type: "11번 타입",
        price: 1000,
      },
      {
        no: 24,
        name: "24번 아이템",
        description: "24번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/woodchair.svg",
        theme: "여름 테마",
        type: "12번 타입",
        price: 1000,
      },

      // 가을 테마
      {
        no: 25,
        name: "25번 아이템",
        description: "25번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/bookstack.svg",
        theme: "가을 테마",
        type: "1번 타입",
        price: 1000,
      },
      {
        no: 26,
        name: "26번 아이템",
        description: "26번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/candleholder.svg",
        theme: "가을 테마",
        type: "2번 타입",
        price: 1000,
      },
      {
        no: 27,
        name: "27번 아이템",
        description: "27번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/autumnleaves.svg",
        theme: "가을 테마",
        type: "3번 타입",
        price: 1000,
      },
      {
        no: 28,
        name: "28번 아이템",
        description: "28번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/knittedblanket.svg",
        theme: "가을 테마",
        type: "4번 타입",
        price: 1000,
      },
      {
        no: 29,
        name: "29번 아이템",
        description: "29번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/woodenlamp.svg",
        theme: "가을 테마",
        type: "5번 타입",
        price: 1000,
      },
      {
        no: 30,
        name: "30번 아이템",
        description: "30번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/lantern.svg",
        theme: "가을 테마",
        type: "6번 타입",
        price: 1000,
      },
      {
        no: 31,
        name: "31번 아이템",
        description: "31번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/fireplace.svg",
        theme: "가을 테마",
        type: "7번 타입",
        price: 1000,
      },
      {
        no: 32,
        name: "32번 아이템",
        description: "32번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/autumnpainting.svg",
        theme: "가을 테마",
        type: "8번 타입",
        price: 1000,
      },
      {
        no: 33,
        name: "33번 아이템",
        description: "33번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/copperpot.svg",
        theme: "가을 테마",
        type: "9번 타입",
        price: 1000,
      },
      {
        no: 34,
        name: "34번 아이템",
        description: "34번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/throwpillow.svg",
        theme: "가을 테마",
        type: "10번 타입",
        price: 1000,
      },
      {
        no: 35,
        name: "35번 아이템",
        description: "35번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/pumpkin.svg",
        theme: "가을 테마",
        type: "11번 타입",
        price: 1000,
      },
      {
        no: 36,
        name: "36번 아이템",
        description: "36번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/harvestbasket.svg",
        theme: "가을 테마",
        type: "12번 타입",
        price: 1000,
      },

      // 겨울 테마
      {
        no: 37,
        name: "37번 아이템",
        description: "37번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/snowglobe.svg",
        theme: "겨울 테마",
        type: "1번 타입",
        price: 1000,
      },
      {
        no: 38,
        name: "38번 아이템",
        description: "38번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/winterwreath.svg",
        theme: "겨울 테마",
        type: "2번 타입",
        price: 1000,
      },
      {
        no: 39,
        name: "39번 아이템",
        description: "39번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/firconecandle.svg",
        theme: "겨울 테마",
        type: "3번 타입",
        price: 1000,
      },
      {
        no: 40,
        name: "40번 아이템",
        description: "40번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/winterplaid.svg",
        theme: "겨울 테마",
        type: "4번 타입",
        price: 1000,
      },
      {
        no: 41,
        name: "41번 아이템",
        description: "41번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/snowflakepillow.svg",
        theme: "겨울 테마",
        type: "5번 타입",
        price: 1000,
      },
      {
        no: 42,
        name: "42번 아이템",
        description: "42번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/frostedmirror.svg",
        theme: "겨울 테마",
        type: "6번 타입",
        price: 1000,
      },
      {
        no: 43,
        name: "43번 아이템",
        description: "43번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/holidaygarland.svg",
        theme: "겨울 테마",
        type: "7번 타입",
        price: 1000,
      },
      {
        no: 44,
        name: "44번 아이템",
        description: "44번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/icedbranch.svg",
        theme: "겨울 테마",
        type: "8번 타입",
        price: 1000,
      },
      {
        no: 45,
        name: "45번 아이템",
        description: "45번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/cozyfire.svg",
        theme: "겨울 테마",
        type: "9번 타입",
        price: 1000,
      },
      {
        no: 46,
        name: "46번 아이템",
        description: "46번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/woodensleigh.svg",
        theme: "겨울 테마",
        type: "10번 타입",
        price: 1000,
      },
      {
        no: 47,
        name: "47번 아이템",
        description: "47번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/snowmanfigurine.svg",
        theme: "겨울 테마",
        type: "11번 타입",
        price: 1000,
      },
      {
        no: 48,
        name: "48번 아이템",
        description: "48번 아이템 설명",
        image:
          BASE_URL +
          "/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/hollyberrybasket.svg",
        theme: "겨울 테마",
        type: "12번 타입",
        price: 1000,
      },
    ],
  });
}
