export const DEFAULT_PRESENT_SELECT_OPTIONS = {
  no: true,
  status: true,
  createdAt: true,
  item: { select: { name: true, image: true, description: true } },
  userPresentSenderNo: { select: { no: true, nickname: true } },
  userPresentReceiverNo: { select: { no: true, nickname: true } },
} as const;
