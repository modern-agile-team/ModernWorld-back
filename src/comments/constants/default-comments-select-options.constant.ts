export const DEFAULT_COMMENTS_SELECT_OPTIONS = {
  no: true,
  content: true,
  createdAt: true,
  commentReceiver: { select: { no: true, nickname: true } },
  commentSender: { select: { no: true, nickname: true } },
} as const;
