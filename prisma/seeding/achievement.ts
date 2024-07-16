import { PrismaClient } from "@prisma/client";

export async function achievement(prisma: PrismaClient) {
  await prisma.achievement.createMany({
    data: [
      {
        name: "commentCount1",
        description: "댓글을 적으니 좋습니다.",
        title: "커뮤 초보자",
        level: "one",
        point: 100,
      },
      {
        name: "commentCount2",
        description: "댓글이 넘쳐납니다!",
        title: "커뮤 중급자",
        level: "two",
        point: 300,
      },
      {
        name: "commentCount3",
        description: "소통왕이네요.",
        title: "커뮤 고급자",
        level: "three",
        point: 1000,
      },
      {
        name: "likeCount1",
        description: "인기가 좀 있으시군요",
        title: "인기인",
        level: "one",
        point: 500,
      },
      {
        name: "likeCount2",
        description: "벌써 20명!",
        title: "커뮤 고급자",
        level: "two",
        point: 1000,
      },
      {
        name: "likeCount3",
        description: "오옹 나이스",
        title: "연애인",
        level: "three",
        point: 2000,
      },
      {
        name: "attendanceCount1",
        description: "출석을 꽤 하시는데요?",
        title: "개근",
        level: "one",
        point: 500,
      },
      {
        name: "attendanceCount2",
        description: "찾아와 주셔서 감사합니다.",
        title: "출석짱",
        level: "two",
        point: 1500,
      },
      {
        name: "attendanceCount3",
        description: "출석왕이십니다.",
        title: "출석왕",
        level: "three",
        point: 3500,
      },
      {
        name: "itemCount1",
        description: "은근히 모으셨군요.",
        title: "부자는 아님",
        level: "one",
        point: 2000,
      },
      {
        name: "itemCount2",
        description: "아직멀었어!",
        title: "돈좀있네",
        level: "two",
        point: 3000,
      },
      {
        name: "itemCount3",
        description: "진정한 부자이십니다.",
        title: "부자",
        level: "three",
        point: 4000,
      },
      {
        name: "presentCount1",
        description: "이렇게 많이 선물을?",
        title: "선함",
        level: "one",
        point: 1000,
      },
      {
        name: "presentCount2",
        description: "천사 이십니까?",
        title: "기부왕",
        level: "two",
        point: 2000,
      },
      {
        name: "presentCount3",
        description: "착한 자에게는 복을",
        title: "기부천사",
        level: "three",
        point: 5000,
      },
    ],
  });
}
