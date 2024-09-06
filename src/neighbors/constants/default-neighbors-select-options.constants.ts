export const DEFAULT_NEIGHBORS_SELECT_OPTIONS = {
  no: true,
  neighborSenderNo: { select: { no: true, nickname: true } },
  neighborReceiverNo: { select: { no: true, nickname: true } },
  createdAt: true,
  status: true,
} as const;
