import { PrismaClient } from "@prisma/client";

export async function legend(prisma: PrismaClient) {
  for (let i = 1; i < 31; i++) {
    const likeCount = await prisma.like.count({ where: { receiverNo: i } });

    const commentCount =
      (await prisma.comment.count({
        where: { receiverNo: i },
      })) + (await prisma.reply.count({ where: { userNo: i } }));

    const itemCount = await prisma.inventory.count({ where: { userNo: i } });
    const presentCount = await prisma.present.count({ where: { senderNo: i } });

    await prisma.legend.create({
      data: {
        userNo: i,
        likeCount,
        commentCount,
        itemCount,
        presentCount,
      },
    });
  }
}
