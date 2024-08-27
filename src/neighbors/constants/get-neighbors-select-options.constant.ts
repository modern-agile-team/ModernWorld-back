export const GET_NEIGHBORS_SELECT_OPTIONS = {
  no: true,
  neighborSenderNo: {
    select: {
      no: true,
      nickname: true,
      image: true,
      description: true,
      userAchievement: {
        select: {
          achievement: { select: { title: true, level: true } },
        },
        where: { status: true },
      },
    },
  },
  neighborReceiverNo: {
    select: {
      no: true,
      nickname: true,
      image: true,
      description: true,
      userAchievement: {
        select: {
          achievement: { select: { title: true, level: true } },
        },
        where: { status: true },
      },
    },
  },
  createdAt: true,
  status: true,
} as const;
