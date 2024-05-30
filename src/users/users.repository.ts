import { Injectable } from "@nestjs/common";
import { PrismaPromise, user } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import { PrismaService } from "src/prisma/prisma.service";
import { DomainEnum } from "./enum/domain.enum";

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  findUserByUniqueIndentifier(
    uniqueIdentifier: string,
  ): PrismaPromise<Pick<user, "no" | "nickname" | "uniqueIdentifier">> {
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

  findUserNicknameByUserNo(no: number): PrismaPromise<Pick<user, "nickname">> {
    return this.prisma.user.findUnique({
      select: { nickname: true },
      where: { no },
    });
  }

  findUserNicknameByNickname(
    nickname: string,
  ): PrismaPromise<Pick<user, "nickname">> {
    return this.prisma.user.findUnique({
      select: { nickname: true },
      where: { nickname },
    });
  }

  updateUserCurrentPoint(
    userNo: number,
    incrementalPoint: number,
  ): PrismaPromise<
    Pick<user, "nickname" | "currentPoint" | "accumulationPoint">
  > {
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
  ): PrismaPromise<
    Pick<user, "nickname" | "currentPoint" | "accumulationPoint">
  > {
    return this.prisma.user.update({
      select: { nickname: true, currentPoint: true, accumulationPoint: true },
      data: {
        currentPoint: { increment: incrementalPoint },
        accumulationPoint: { increment: incrementalPoint },
      },
      where: { no: userNo },
    });
  }

  findUserPoint(
    userNo: number,
  ): PrismaPromise<Pick<user, "nickname" | "currentPoint">> {
    return this.prisma.user.findUnique({
      select: { nickname: true, currentPoint: true },
      where: { no: userNo },
    });
  }

  getUserAttendance(
    userNo: number,
  ): PrismaPromise<Pick<user, "no" | "nickname" | "attendance">> {
    return this.prisma.user.findUnique({
      select: { no: true, nickname: true, attendance: true },
      where: { no: userNo },
    });
  }

  updateUserAttendance(
    userNo: number,
    attendance: JsonValue,
  ): PrismaPromise<Pick<user, "nickname" | "attendance">> {
    return this.prisma.user.update({
      select: { nickname: true, attendance: true },
      data: { attendance },
      where: { no: userNo },
    });
  }

  resetUserAttendance(): PrismaPromise<{ count: number }> {
    return this.prisma.user.updateMany({
      data: {
        attendance: {
          "0": [false, 100],
          "1": [false, 200],
          "2": [false, 300],
          "3": [false, 200],
          "4": [false, 400],
          "5": [false, 300],
          "6": [false, 300],
        },
      },
    });
  }

  updateUserNickname(
    userNo: number,
    nickname: string,
  ): PrismaPromise<Pick<user, "no" | "nickname">> {
    return this.prisma.user.update({
      select: { no: true, nickname: true },
      data: { nickname },
      where: { no: userNo },
    });
  }

  updateUserDescription(
    userNo: number,
    description: string,
  ): PrismaPromise<Pick<user, "no" | "description">> {
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

  getUsers(
    take: number,
    orderByField: string = "createdAt",
    skip: number,
    sort: string,
    where: { nickname: {}; characterLocker: {} },
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

  updateUserLike(userNo: number, count: number) {
    return this.prisma.user.update({
      data: { like: { increment: count } },
      where: { no: userNo },
    });
  }
}
