import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserRepository } from "./users.repository";
import { GetUsersByAnimalDto } from "./dtos/get-users-by-animal.dto";

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userRepository: UserRepository,
  ) {}

  async getUserNameCurrentPointAccumulationPointTitle(no: number) {
    const result =
      await this.userRepository.getUserNameCurrentPointAccumulationPointTitle(
        no,
      );

    return {
      nickname: result.nickname,
      currentPoint: result.currentPoint,
      accumulationPoint: result.accumulationPoint,
      title: result.userAchievement[0].achievement.title,
      fontColor: result.userAchievement[0].achievement.fontColor,
    };
  }

  // async createUser(
  //   uniqueIndentifier,
  //   socialName,
  //   image,
  //   uniqueIdentifier,
  //   domain,
  // ) {
  //   const result = await this.userRepository.createUser(createUserDto);

  //   return result;
  // }

  async updateUser(UpdateUserDto: UpdateUserDto) {
    // const result = await this.prisma.user.update();
    const result = await this.prisma.user.update({
      where: { no: UpdateUserDto.no },
      data: {
        description: UpdateUserDto.description,
      },
    });

    return result;
  }

  async getUsersByAnimal(pageNo: number, queryParams: GetUsersByAnimalDto) {
    const { take, animal, orderByField } = queryParams;

    const skip = (pageNo - 1) * take;
    const sort = orderByField === "createdAt" ? "asc" : "desc";

    const result = await this.userRepository.getUsersByAnimal(
      take,
      orderByField,
      animal,
      skip,
      sort,
    );

    //가공
    return result.map((obj) => ({
      nickname: obj.nickname,
      description: obj.description,
      createdAt: obj.createdAt,
      like: obj.like,
      accumulationPoint: obj.accumulationPoint,
      achievementTitle: obj.userAchievement[0]
        ? obj.userAchievement[0].achievement.title
        : null,
      achievementFontColor: obj.userAchievement[0]
        ? obj.userAchievement[0].achievement.fontColor
        : null,
      characterImage: obj.characterLocker[0]
        ? obj.characterLocker[0].character.image
        : null,
    }));
  }
}
