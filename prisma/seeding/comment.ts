import { PrismaClient } from "@prisma/client";

export async function comment(prisma: PrismaClient) {
  await prisma.comment.createMany({
    data: [
      { receiverNo: 1, senderNo: 2, content: "asd" },
      { receiverNo: 1, senderNo: 3, content: "aswd" },
      { receiverNo: 1, senderNo: 4, content: "asdq" },
      { receiverNo: 1, senderNo: 5, content: "asazd" },
      { receiverNo: 1, senderNo: 6, content: "asaxd" },
      { receiverNo: 1, senderNo: 7, content: "asdcd" },
      { receiverNo: 1, senderNo: 8, content: "asdvvd" },
      { receiverNo: 1, senderNo: 9, content: "asd" },
      { receiverNo: 1, senderNo: 10, content: "asd" },
      { receiverNo: 1, senderNo: 11, content: "asdd" },
      { receiverNo: 1, senderNo: 2, content: "asqdd" },
      { receiverNo: 1, senderNo: 3, content: "asdwd" },
      { receiverNo: 1, senderNo: 4, content: "asdeasd" },
      { receiverNo: 1, senderNo: 5, content: "asdr" },
      { receiverNo: 1, senderNo: 2, content: "asdgzz" },
      { receiverNo: 1, senderNo: 2, content: "asdzz" },
      { receiverNo: 1, senderNo: 2, content: "asdcz" },
    ],
  });
}
