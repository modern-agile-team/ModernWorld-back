import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { GetUsersByAnimalDto } from "./dtos/get-users-by-animal.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { InventoryRepository } from "src/inventory/inventory.repository";
import { CharacterLockerRepository } from "src/character-locker/charactersLocker.repository";

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userRepository: UsersRepository,
    private readonly inventoryRepository: InventoryRepository,
    private readonly charactersRepository: CharacterLockerRepository,
  ) {}

  async getUserNameCurrentPointAccumulationPointTitle(userNo: number) {
    const result =
      await this.userRepository.getUserNameCurrentPointAccumulationPointTitle(
        userNo,
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
  //   uniqueIdentifier: string,
  //   socialName: string,
  //   image: string,
  //   domain: string,
  // ) {
  //   const result = await this.userRepository.createUser(
  //     uniqueIdentifier,
  //     socialName,
  //     image,
  //     domain,
  //   );
  //   return result;
  // }

  async getUserAttendance(userNo: number) {
    const result = await this.userRepository.getUserAttendance(userNo);

    return result;
  }

  async markUserAttendance(userNo: number) {
    /**
     * 일주일 출석부 가져와서 월, 화, 수, 목, 금, 토, 일
     * 즉, 요일에 따라 출석부가 갱신되어야함, 근데 한국시간 기준으로 만들어야함
     *
     * 본인 출석부에 출석체크 하는지 확인(토큰의 userNo와 Param의 userNo가 같은지 확인) <------------이거 해야됨
     *
     * 일단 오늘 요일 확인해서 받아옴 (한국시간 기준)ㅇ
     *
     * 이후 유저 출석부 가져옴ㅇ
     *
     * 해당요일 이미 출석체크 돼있다면 이미 출석돼있다고 반환ㅇ
     *
     * 안돼있다면 출석체크 하고 포인트 얻음 (트랜잭션으로 묶음)ㅇ
     * 끝
     * */

    //토큰의 userNo !== 파람의 userNo 작업

    const offset = 1000 * 60 * 60 * 9;
    const today = new Date(Date.now() + offset); // GMT + 9 = 한국시각 (ms)
    const day = today.getUTCDay(); //getDay()는 현재 로컬환경시각인 +9를 더해주는 바람에 안됨(뇌피셜)

    let attendance = (await this.userRepository.getUserAttendance(userNo))
      .attendance;

    if (attendance[day][0]) {
      throw new BadRequestException("already attended");
    }

    attendance[day][0] = true;

    try {
      const [user, point] = await this.prisma.$transaction([
        this.userRepository.updateUserAttendance(userNo, attendance),

        this.userRepository.modifyUserCurrentPointAccumulationPoint(
          userNo,
          attendance[day][1],
        ),
      ]);

      //아니 근데 이거 다 주는거 맞냐??;; 의미 없는것같은데
      return [user, point];
    } catch (error) {
      throw new InternalServerErrorException("transaction error");
    }
  }

  async updateUserNicknameDescriptionAttendanceCharacter(
    userNo: number,
    characterNo: number,
    nickname: string,
    description: string,
  ) {
    //이곳에 트랜잭션으로 캐릭터보관함에 캐릭터 넣는것까지 같이 할것.
    console.log(characterNo);

    const result =
      await this.userRepository.updateUserNicknameDesriptionAttendance(
        userNo,
        nickname,
        description,
      );

    return result;
  }

  async getUserRoom(userNo: number) {
    const result = await this.inventoryRepository.getUserRoom(userNo);

    return result.map((obj) => ({
      status: obj.status,
      itemName: obj.item.name,
      itemImage: obj.item.image,
      itemType: obj.item.type,
    }));
  }

  async getUsersByAnimal(pageNo: number, queryParams: GetUsersByAnimalDto) {
    const { take, animal, orderByField, userName } = queryParams;

    const skip = (pageNo - 1) * take;
    const sort = orderByField === "createdAt" ? "asc" : "desc";

    const result = await this.userRepository.getUsersByAnimal(
      take,
      orderByField,
      animal,
      skip,
      sort,
      userName,
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

  async getUserCharacters(userNo: number, species?: string) {
    return await this.charactersRepository.getUserAllCharactersBySpecies(
      userNo,
      species,
    );
  }
}
