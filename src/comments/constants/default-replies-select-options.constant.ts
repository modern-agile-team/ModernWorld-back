export const DEFAULT_REPLIES_SELECT_OPTIONS = {
  no: true,
  commentNo: true,
  content: true,
  createdAt: true,
  user: { select: { no: true, nickname: true } },
} as const;
