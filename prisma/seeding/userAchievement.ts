import { PrismaClient } from "@prisma/client";

export async function userAchievement(prisma: PrismaClient) {
  await prisma.userAchievement.createMany({
    data: [
      {
        userNo: 1,
        achievementNo: 1,
        status: true,
      },
      {
        userNo: 1,
        achievementNo: 2,
        status: false,
      },
      {
        userNo: 1,
        achievementNo: 3,
        status: false,
      },
      {
        userNo: 1,
        achievementNo: 4,
        status: false,
      },
      {
        userNo: 1,
        achievementNo: 5,
        status: false,
      },
      {
        userNo: 1,
        achievementNo: 6,
        status: false,
      },
      {
        userNo: 1,
        achievementNo: 7,
        status: false,
      },

      {
        userNo: 2,
        achievementNo: 2,
        status: true,
      },
      {
        userNo: 2,
        achievementNo: 5,
        status: false,
      },
      {
        userNo: 2,
        achievementNo: 10,
        status: false,
      },
      {
        userNo: 2,
        achievementNo: 13,
        status: false,
      },
      {
        userNo: 2,
        achievementNo: 15,
        status: false,
      },

      {
        userNo: 3,
        achievementNo: 10,
        status: true,
      },

      {
        userNo: 4,
        achievementNo: 3,
        status: true,
      },

      {
        userNo: 5,
        achievementNo: 2,
        status: true,
      },

      {
        userNo: 6,
        achievementNo: 5,
        status: true,
      },

      {
        userNo: 7,
        achievementNo: 8,
        status: true,
      },

      {
        userNo: 8,
        achievementNo: 4,
        status: true,
      },
    ],
  });
}
