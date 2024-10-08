import { Injectable } from "@nestjs/common";
import { UserDomain } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaTxType } from "src/prisma/prisma.type";

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  findUserByUniqueIndentifier(uniqueIdentifier: string) {
    return this.prisma.user.findUnique({
      select: { no: true, nickname: true, uniqueIdentifier: true },
      where: { uniqueIdentifier },
    });
  }

  updateDeletedAt(userNo: number, deletedAt: Date | null) {
    return this.prisma.user.update({
      data: { deletedAt },
      where: { no: userNo },
    });
  }

  updateUser(userNo: number, socialName: string, image: string) {
    return this.prisma.user.update({
      select: { no: true, image: true, socialName: true },
      data: { image, socialName },
      where: { no: userNo },
    });
  }

  createUser(
    uniqueIdentifier: string,
    socialName: string,
    image: string,
    domain: UserDomain,
  ) {
    return this.prisma.user.create({
      data: {
        uniqueIdentifier,
        socialName,
        image,
        domain,
        attendance: {
          "0": [0, 100],
          "1": [0, 200],
          "2": [0, 300],
          "3": [0, 200],
          "4": [0, 400],
          "5": [0, 300],
          "6": [0, 300],
        },
      },
    });
  }

  findUserByUserNo(no: number) {
    return this.prisma.user.findUnique({
      where: { no },
    });
  }

  findUserNicknameByNickname(nickname: string) {
    return this.prisma.user.findUnique({
      select: { nickname: true },
      where: { nickname },
    });
  }

  getUserChanceByUserNo(userNo: number) {
    return this.prisma.user.findUnique({
      select: { chance: true },
      where: { no: userNo },
    });
  }

  initAllUserChance() {
    return this.prisma.user.updateMany({ data: { chance: 10 } });
  }

  updateUserChance(userNo: number, increment: number, tx?: PrismaTxType) {
    return (tx ?? this.prisma).user.update({
      data: { chance: { increment } },
      where: { no: userNo },
    });
  }

  updateUserCurrentPoint(
    userNo: number,
    incrementalPoint: number,
    tx?: PrismaTxType,
  ) {
    return (tx ?? this.prisma).user.update({
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
    tx?: PrismaTxType,
  ) {
    return (tx ?? this.prisma).user.update({
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
      where: { no: userNo, deletedAt: null },
    });
  }

  getUserAttendance(userNo: number) {
    return this.prisma.user.findUnique({
      select: { no: true, nickname: true, attendance: true },
      where: { no: userNo },
    });
  }

  isAdmin(userNo: number) {
    return this.prisma.user.findUnique({
      select: { admin: true },
      where: { no: userNo },
    });
  }

  getUserUniqueIndentifier(userNo: number) {
    return this.prisma.user.findUnique({
      select: { uniqueIdentifier: true },
      where: { no: userNo },
    });
  }

  updateUserAttendance(
    userNo: number,
    attendance: JsonValue,
    tx?: PrismaTxType,
  ) {
    return (tx ?? this.prisma).user.update({
      select: { nickname: true, attendance: true },
      data: { attendance },
      where: { no: userNo },
    });
  }

  resetUserAttendance() {
    return this.prisma.user.updateMany({
      data: {
        attendance: {
          "0": [0, 100],
          "1": [0, 200],
          "2": [0, 300],
          "3": [0, 200],
          "4": [0, 400],
          "5": [0, 300],
          "6": [0, 300],
        },
      },
    });
  }

  updateUserNickname(userNo: number, nickname: string) {
    return this.prisma.user.update({
      select: { no: true, nickname: true },
      data: { nickname },
      where: { no: userNo },
    });
  }

  updateUserDescription(userNo: number, description: string) {
    return this.prisma.user.update({
      select: { no: true, description: true },
      data: { description },
      where: { no: userNo },
    });
  }

  getOneUser(userNo: number) {
    return this.prisma.user.findUnique({
      select: {
        no: true,
        socialName: true,
        nickname: true,
        description: true,
        currentPoint: true,
        accumulationPoint: true,
        image: true,

        legend: { select: { likeCount: true } },

        characterLocker: {
          select: { character: { select: { no: true, image: true } } },
          where: { status: true },
        },

        userAchievement: {
          select: { achievement: { select: { title: true, level: true } } },
          where: { status: true },
        },

        chance: true,
      },

      where: { no: userNo },
    });
  }

  countUsers(where) {
    return this.prisma.user.count({ where });
  }

  getUsers(
    take: number,
    skip: number,
    orderBy: object,
    where: { nickname: {}; characterLocker: {} },
  ) {
    return this.prisma.user.findMany({
      take: take,
      skip: skip,
      select: {
        no: true,
        nickname: true,
        description: true,
        accumulationPoint: true,
        createdAt: true,

        legend: { select: { likeCount: true } },

        characterLocker: {
          select: { character: { select: { no: true, image: true } } },
          where: { status: true },
        },

        userAchievement: {
          select: { achievement: { select: { title: true, level: true } } },
          where: { status: true },
        },

        chance: true,
      },

      where,

      orderBy,
    });
  }

  deleteOneUserByDeletedAt(date: Date) {
    return this.prisma.user.deleteMany({
      where: { deletedAt: { lte: date } },
    });
  }
}
