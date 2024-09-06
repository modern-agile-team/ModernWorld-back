export const DEFAULT_PRESENTS_SELECT_OPTIONS = {
  no: true,
  status: true,
  createdAt: true,
  item: { select: { name: true, image: true, description: true } },
  userPresentSenderNo: { select: { no: true, nickname: true } },
  userPresentReceiverNo: { select: { no: true, nickname: true } },
} as const;
