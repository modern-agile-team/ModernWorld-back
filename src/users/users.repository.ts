import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  findUserUniqueIndentifier(uniqueIdentifier: string) {
    return this.prisma.user.findUnique({
      select: { no: true, nickname: true, uniqueIdentifier: true },
      where: { uniqueIdentifier },
    });
  }

  createUser(
    uniqueIdentifier: string,
    socialName: string,
    image: string,
    domain: string,
  ) {
    return this.prisma.user.create({
      data: {
        uniqueIdentifier,
        socialName,
        image,
        domain:
          domain === "naver"
            ? "naver"
            : domain === "google"
              ? "google"
              : "kakao",
      },
    });
  }

  modifyUserPoint(userNo: number, point: number) {
    return this.prisma.user.update({
      where: { no: userNo },
      data: { currentPoint: { decrement: point } },
    });
  }

  findUserPoint(userNo: number) {
    return this.prisma.user.findFirst({
      where: { no: userNo },
      select: { nickname: true, currentPoint: true },
    });
  }

  getUserAttendance(userNo: number) {
    return this.prisma.user.findUnique({
      select: { nickname: true, attendance: true },
      where: { no: userNo },
    });
  }

  getUserNameCurrentPointAccumulationPointTitle(no: number) {
    return this.prisma.user.findUnique({
      where: {
        no,
      },

      select: {
        nickname: true,
        currentPoint: true,
        accumulationPoint: true,
        userAchievement: {
          where: { status: true },
          select: {
            achievement: { select: { title: true, fontColor: true } },
          },
        },
      },
    });
  }

  getUsersByAnimal(
    take: number,
    orderByField: string,
    animal: string,
    skip: number,
    sort: string,
  ) {
    let where = {};

    if (animal) {
      where = {
        characterLocker: {
          some: { status: true, character: { species: animal } },
        },
      };
    }

    return this.prisma.user.findMany({
      take: take,
      skip: skip,
      select: {
        nickname: true,
        description: true,
        createdAt: true,
        accumulationPoint: true,
        like: true,

        userAchievement: {
          where: { status: true },
          select: {
            achievement: {
              select: { fontColor: true, title: true },
            },
          },
        },

        characterLocker: {
          where: { status: true },
          select: {
            character: { select: { image: true } },
          },
        },
      },

      where,

      orderBy: [{ [orderByField]: sort }, { createdAt: "desc" }],
    });
  }
}
