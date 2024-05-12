import { Injectable } from "@nestjs/common";
import { PrismaPromise, user } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  findUserByUniqueIndentifier(
    uniqueIdentifier: string,
  ): PrismaPromise<{ no: number; nickname: string; uniqueIdentifier: string }> {
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
  ): PrismaPromise<user> {
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

  updateUserCurrentPoint(
    userNo: number,
    incrementalPoint: number,
  ): PrismaPromise<{
    nickname: string;
    currentPoint: number;
    accumulationPoint: number;
  }> {
    return this.prisma.user.update({
      select: { nickname: true, currentPoint: true, accumulationPoint: true },
      data: {
        currentPoint: { increment: incrementalPoint },
      },
      where: { no: userNo },
    });
  }

  updateUserCurrentPointAccumulationPoint(
    userNo: number,
    incrementalPoint: number,
  ): PrismaPromise<{
    nickname: string;
    currentPoint: number;
    accumulationPoint: number;
  }> {
    return this.prisma.user.update({
      select: { nickname: true, currentPoint: true, accumulationPoint: true },
      data: {
        currentPoint: { increment: incrementalPoint },
        accumulationPoint: { increment: incrementalPoint },
      },
      where: { no: userNo },
    });
  }

  findUserPoint(userNo: number): PrismaPromise<{
    nickname: string;
    currentPoint: number;
  }> {
    return this.prisma.user.findUnique({
      select: { nickname: true, currentPoint: true },
      where: { no: userNo },
    });
  }

  getUserAttendance(userNo: number): PrismaPromise<{
    nickname: string;
    attendance: JsonValue;
  }> {
    return this.prisma.user.findUnique({
      select: { nickname: true, attendance: true },
      where: { no: userNo },
    });
  }

  updateUserAttendance(
    userNo: number,
    attendance: JsonValue,
  ): PrismaPromise<{
    nickname: string;
    attendance: JsonValue;
  }> {
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
  ): PrismaPromise<user> {
    return this.prisma.user.update({
      data: {
        nickname,
        description,
        attendance: {},
      },
      where: { no: userNo },
    });
  }

  getUserNameCurrentPointAccumulationPointTitle(userNo: number): PrismaPromise<{
    nickname: string;
    currentPoint: number;
    accumulationPoint: number;
    userAchievement: {
      achievement: { title: string; fontColor: string };
    }[];
  }> {
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
    nickname?: string,
  ): PrismaPromise<
    {
      nickname: string;
      accumulationPoint: number;
      description: string;
      like: number;
      createdAt: Date;
      characterLocker: { character: { image: string } }[];
      userAchievement: { achievement: { title: string; fontColor: string } }[];
    }[]
  > {
    let where = { nickname: { contains: nickname }, characterLocker: {} };

    if (animal) {
      where.characterLocker = {
        some: { status: true, character: { species: animal } },
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

      orderBy: [{ [orderByField]: sort }, { no: "desc" }],
    });
  }
}
