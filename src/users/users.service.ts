import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dtos/create-user-dto";
import { UpdateUserDto } from "./dtos/update-user-dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async getUserNameAndCurrentPointAndAccumulatinPointAndTitle(no: number) {
    const result = await this.prisma.user.findUnique({
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

    return {
      nickname: result.nickname,
      currentPoint: result.currentPoint,
      accumulationPoint: result.accumulationPoint,
      title: result.userAchievement[0].achievement.title,
      fontColor: result.userAchievement[0].achievement.fontColor,
    };
  }

  async createUser(data: CreateUserDto) {
    const result = await this.prisma.user.create({
      data: {
        nickname: data.nickname,
        description: data.description,
        attendance: data.attendance,
        status: data.status,
        uniqueIdentifier: data.uniqueIdentifier,
      },
    });

    return result;
  }

  async updateUser(data: UpdateUserDto) {
    // const result = await this.prisma.user.update();
    const result = await this.prisma.user.update({
      where: { no: data.no },
      data: {
        description: data.description,
      },
    });

    return result;
  }

  async showUsersByAnimal(
    pageNo: number,
    take: number,
    orderField: string,
    animal: string,
  ) {
    const skip = (pageNo - 1) * take;

    const result = await this.prisma.user.findMany({
      take: take,
      skip: skip,
      select: {
        nickname: true,
        description: true,
        createdAt: true,
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
      orderBy: [{ [orderField]: "desc" }, { createdAt: "desc" }],
    });
    return result;
  }
}
