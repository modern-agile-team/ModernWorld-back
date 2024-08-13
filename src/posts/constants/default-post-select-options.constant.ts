export const DEFAULT_POST_SELECT_OPTIONS = {
  no: true,
  content: true,
  createdAt: true,
  check: true,
  userPostSenderNo: { select: { no: true, nickname: true } },
  userPostReceiverNo: { select: { no: true, nickname: true } },
} as const;
