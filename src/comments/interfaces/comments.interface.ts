interface SenderMessage {
  senderNo: number;
  deletedAt: Date | null;
}

interface ReceiverMessage {
  receiverNo: number;
  deletedAt: Date | null;
}

export type CommentSendReceive =
  | {
      receiverNo: number;
      deletedAt: null;
    }
  | {
      senderNo: number;
      deletedAt: null;
    };
