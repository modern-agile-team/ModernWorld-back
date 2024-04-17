import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dtos/create-user-dto";
import { UpdateUserDto } from "./dtos/update-user-dto";
import { UserRepository } from "./users.repository";
import { GetUsersByAnimalDto } from "./dtos/get-usersByanimal-dto";

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

  async createUser(createUserDto: CreateUserDto) {
    const result = await this.userRepository.createUser(createUserDto);

    return result;
  }

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

  async getUsersByAnimal(getUsersByAnimal: GetUsersByAnimalDto) {
    const { pageNo, take, animal, orderByField } = getUsersByAnimal;

    const skip = (pageNo - 1) * take;
    const sort = orderByField === "createdAt" ? "asc" : "desc";

    const result = await this.userRepository.getUsersByAnimal(
      take,
      orderByField,
      animal,
      skip,
      sort,
    );

    console.log(result);

    result.map((obj) => {
      let object = {};
      // object[obj.characterLocker] = obj.userAchievement;
    });

    return result;
  }
}
