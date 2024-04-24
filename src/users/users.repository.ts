import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  findUserByUniqueIndentifier(uniqueIdentifier: string) {
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

  modifyUserPoint(userNo: number, incrementalPoint: number) {
    return this.prisma.user.update({
      data: { currentPoint: { decrement: incrementalPoint } },
      where: { no: userNo },
    });
  }

  findUserPoint(userNo: number) {
    return this.prisma.user.findUnique({
      select: { nickname: true, currentPoint: true },
      where: { no: userNo },
    });
  }

  getUserAttendance(userNo: number) {
    return this.prisma.user.findUnique({
      select: { nickname: true, attendance: true },
      where: { no: userNo },
    });
  }

  getUserNameCurrentPointAccumulationPointTitle(userNo: number) {
    return this.prisma.user.findUnique({
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

      where: { no: userNo },
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
