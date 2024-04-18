import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dtos/create-user-dto";

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  findUserUniqueIndetifier(uniqueIdentifier: string) {
    return this.prisma.user.findUnique({
      select: { no: true, nickname: true, uniqueIdentifier: true },
      where: { uniqueIdentifier: uniqueIdentifier },
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

  createUser(createUserDto: CreateUserDto) {
    const {
      nickname,
      description,
      attendance,
      status,
      uniqueIdentifier,
      socialName,
      image,
      domain,
    } = createUserDto;

    return this.prisma.user.create({
      data: {
        nickname,
        description,
        attendance,
        status,
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

  getUsersByAnimal(
    take: number,
    orderByField: string,
    animal: string,
    skip: number,
    sort: string,
  ) {
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
            status: true,
            achievement: { select: { name: true, fontColor: true } },
          },
        },
        characterLocker: {
          where: { status: true },
          select: {
            status: true,
            character: { select: { image: true, species: true } },
          },
        },
      },

      where: {
        characterLocker: {
          some: { status: true, character: { species: animal } },
        },
      },
      orderBy: [{ [orderByField]: sort }, { createdAt: "desc" }],
    });
  }
}
