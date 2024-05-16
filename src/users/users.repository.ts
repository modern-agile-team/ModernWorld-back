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

  findUserNicknameByUserNo(no: number): PrismaPromise<{ nickname: string }> {
    return this.prisma.user.findUnique({
      select: { nickname: true },
      where: { no },
    });
  }

  findUserNicknameByNickname(
    nickname: string,
  ): PrismaPromise<{ nickname: string }> {
    return this.prisma.user.findUnique({
      select: { nickname: true },
      where: { nickname },
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
      where: { no: userNo },
    });
  }

  updateUserNickname(
    userNo: number,
    nickname: string,
  ): PrismaPromise<{ no: number; nickname: string }> {
    return this.prisma.user.update({
      select: { no: true, nickname: true },
      data: { nickname },
      where: { no: userNo },
    });
  }

  updateUserDescription(
    userNo: number,
    description: string,
  ): PrismaPromise<{ no: number; description: string }> {
    return this.prisma.user.update({
      select: { no: true, description: true },
      data: { description },
      where: { no: userNo },
    });
  }

  getUserNamePointTitleCharacter(userNo: number): PrismaPromise<{
    nickname: string;
    currentPoint: number;
    accumulationPoint: number;
    like: number;
    characterLocker: { character: { image: string } }[];
    userAchievement: {
      achievement: { title: string; level: string };
    }[];
  }> {
    return this.prisma.user.findUnique({
      select: {
        nickname: true,
        currentPoint: true,
        accumulationPoint: true,
        like: true,
        characterLocker: {
          select: { character: { select: { image: true } } },
          where: { status: true },
        },
        userAchievement: {
          select: {
            achievement: { select: { title: true, level: true } },
          },
          where: { status: true },
        },
      },

      where: { no: userNo },
    });
  }

  getUsersByAnimal(
    take: number,
    orderByField: string,
    skip: number,
    sort: string,
    where: object,
  ): PrismaPromise<
    {
      nickname: string;
      accumulationPoint: number;
      description: string;
      like: number;
      createdAt: Date;
      characterLocker: { character: { image: string } }[];
      userAchievement: { achievement: { title: string; level: string } }[];
    }[]
  > {
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
              select: { title: true, level: true },
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
