import { PrismaClient } from "@prisma/client";

export async function user(prisma: PrismaClient) {
  for (let i = 1; i <= 30; i++) {
    const key = Math.floor(Math.random() * 3);
    const domain = key === 0 ? "naver" : key === 1 ? "google" : "kakao";

    await prisma.user.create({
      data: {
        nickname: `${i}번닉네임`,
        description: `${i}번소개`,
        attendance: {},
        uniqueIdentifier: `${i}번고유식별자`,
        socialName: `${i}번소셜네임`,
        image: `${i}번이미지`,
        domain,
      },
    });
  }
}
