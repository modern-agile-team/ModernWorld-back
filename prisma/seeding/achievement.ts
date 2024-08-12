import { PrismaClient } from "@prisma/client";

export async function achievement(prisma: PrismaClient) {
  await prisma.achievement.createMany({
    data: [
      {
        name: "commentCount1",
        description: "댓글 10개 작성시 달성합니다.",
        title: "소통해요",
        level: "one",
        point: 1000,
      },
      {
        name: "commentCount2",
        description: "댓글 20개 작성시 달성합니다.",
        title: "소통완료",
        level: "two",
        point: 2000,
      },
      {
        name: "commentCount3",
        description: "댓글 40개 작성시 달성합니다.",
        title: "댓글부대",
        level: "three",
        point: 4000,
      },

      {
        name: "likeCount1",
        description: "좋아요 10개를 받으면 달성합니다.",
        title: "인싸",
        level: "one",
        point: 1000,
      },
      {
        name: "likeCount2",
        description: "좋아요 20개를 받으면 달성합니다.",
        title: "인플루언서",
        level: "two",
        point: 2000,
      },
      {
        name: "likeCount3",
        description: "좋아요 40개를 받으면 달성합니다.",
        title: "연예인",
        level: "three",
        point: 4000,
      },

      {
        name: "attendanceCount1",
        description: "출석을 10회 하면 달성합니다.",
        title: "성실",
        level: "one",
        point: 1000,
      },
      {
        name: "attendanceCount2",
        description: "출석을 20회 하면 달성합니다.",
        title: "꾸준",
        level: "two",
        point: 2000,
      },
      {
        name: "attendanceCount3",
        description: "출석을 40회 하면 달성합니다.",
        title: "개근",
        level: "three",
        point: 4000,
      },

      {
        name: "itemCount1",
        description: " 아이템 10개 구매시 달성합니다.",
        title: "돈있음",
        level: "one",
        point: 10000,
      },
      {
        name: "itemCount2",
        description: " 아이템 20개 구매시 달성합니다.",
        title: "돈많음",
        level: "two",
        point: 20000,
      },
      {
        name: "itemCount3",
        description: " 아이템 40개 구매시 달성합니다.",
        title: "부자",
        level: "three",
        point: 40000,
      },

      {
        name: "presentCount1",
        description: "선물을 10번 보낼 시 달성합니다.",
        title: "착함",
        level: "one",
        point: 1000,
      },
      {
        name: "presentCount2",
        description: "선물을 20번 보낼 시 달성합니다.",
        title: "엄청착함",
        level: "two",
        point: 2000,
      },
      {
        name: "presentCount3",
        description: "선물을 40번 보낼 시 달성합니다.",
        title: "천사",
        level: "three",
        point: 4000,
      },

      {
        name: "RSPWinCount1",
        description: "가위바위보 게임에서 10번 승리하면 달성합니다.",
        title: "대단함",
        level: "one",
        point: 1000,
      },
      {
        name: "RSPWinCount2",
        description: "가위바위보 게임에서 20번 승리하면 달성합니다.",
        title: "멋짐",
        level: "two",
        point: 2000,
      },
      {
        name: "RSPWinCount3",
        description: "가위바위보 게임에서 40번 승리하면 달성합니다.",
        title: "레전드",
        level: "three",
        point: 4000,
      },
    ],
  });
}
