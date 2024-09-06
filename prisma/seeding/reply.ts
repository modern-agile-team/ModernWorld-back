import { PrismaClient } from "@prisma/client";

export async function reply(prisma: PrismaClient) {
  await prisma.reply.createMany({
    data: [
      { commentNo: 1, userNo: 1, content: "댓글의 댓글" },
      { commentNo: 1, userNo: 1, content: "댓글의 댓글" },
      { commentNo: 2, userNo: 3, content: "댓글의 댓글" },
      { commentNo: 2, userNo: 1, content: "댓글의 댓글" },
      { commentNo: 2, userNo: 1, content: "댓글의 댓글" },
      { commentNo: 1, userNo: 3, content: "댓글의 댓글" },
      { commentNo: 1, userNo: 1, content: "댓글의 댓글" },
      { commentNo: 3, userNo: 2, content: "댓글의 댓글" },
      { commentNo: 3, userNo: 1, content: "댓글의 댓글" },
      { commentNo: 3, userNo: 2, content: "댓글의 댓글" },
      { commentNo: 3, userNo: 1, content: "댓글의 댓글" },
      { commentNo: 1, userNo: 4, content: "댓글의 댓글" },
      { commentNo: 1, userNo: 1, content: "댓글의 댓글" },
      { commentNo: 1, userNo: 5, content: "댓글의 댓글" },
      { commentNo: 4, userNo: 1, content: "댓글의 댓글" },
      { commentNo: 4, userNo: 1, content: "댓글의 댓글" },
      { commentNo: 4, userNo: 5, content: "댓글의 댓글" },
      { commentNo: 4, userNo: 1, content: "댓글의 댓글" },
      { commentNo: 5, userNo: 6, content: "댓글의 댓글" },
      { commentNo: 5, userNo: 6, content: "댓글의 댓글" },
      { commentNo: 5, userNo: 1, content: "댓글의 댓글" },
    ],
  });
}
