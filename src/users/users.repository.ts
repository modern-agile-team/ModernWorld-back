import { Injectable } from "@nestjs/common";
import { JsonValue } from "@prisma/client/runtime/library";
import { contains } from "class-validator";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersRepository {
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

  modifyUserCurrentPoint(userNo: number, incrementalPoint: number) {
    return this.prisma.user.update({
      select: { nickname: true, currentPoint: true, accumulationPoint: true },
      data: {
        currentPoint: { increment: incrementalPoint },
      },
      where: { no: userNo },
    });
  }

  modifyUserCurrentPointAccumulationPoint(
    userNo: number,
    incrementalPoint: number,
  ) {
    return this.prisma.user.update({
      select: { nickname: true, currentPoint: true, accumulationPoint: true },
      data: {
        currentPoint: { increment: incrementalPoint },
        accumulationPoint: { increment: incrementalPoint },
      },
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

  updateUserAttendance(userNo: number, attendance: JsonValue) {
    return this.prisma.user.update({
      select: { nickname: true, attendance: true },
      data: { attendance },
      where: {
        no: userNo,
      },
    });
  }

  updateUserNicknameDesriptionAttendance(
    userNo: number,
    nickname: string,
    description: string,
  ) {
    return this.prisma.user.update({
      data: {
        nickname,
        description,
        attendance: {},
      },
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
    userName?: string,
  ) {
    let where = {};

    if (animal) {
      where = {
        userName: { contains: userName },
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
