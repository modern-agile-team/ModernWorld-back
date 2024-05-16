import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { GetUsersByAnimalDto } from "./dtos/get-users-by-animal.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserNicknameDto } from "./dtos/update-user-nickname.dto";
import { UpdateUserDescriptionDto } from "./dtos/update-user-description.dto";

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userRepository: UsersRepository,
  ) {}

  getUserNamePointTitleCharacter(userNo: number) {
    return this.userRepository.getUserNamePointTitleCharacter(userNo);
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
    return this.userRepository.getUserAttendance(userNo);
  }

  async markUserAttendance(tokenUserNo: number, userNo: number) {
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

    if (tokenUserNo !== userNo) {
      throw new ForbiddenException(
        "User can only check in on their own attendance.",
      );
    }

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

        this.userRepository.updateUserCurrentPointAccumulationPoint(
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

  async updateUserNickname(
    tokenUserNo: number,
    userNo: number,
    body: UpdateUserNicknameDto,
  ) {
    if (tokenUserNo !== userNo) {
      throw new ForbiddenException("User can only fix their own name.");
    }

    const { nickname: userName } =
      await this.userRepository.findUserNickname(userNo);

    console.log(userName);

    if (userName) {
      throw new ForbiddenException("User already has a nickname.");
    }

    const { nickname } = body;

    const duplicateName =
      await this.userRepository.findUserByNickname(nickname);

    if (duplicateName) {
      throw new ForbiddenException(`[${nickname}] is duplicated.`);
    }

    return this.userRepository.updateUserNickname(userNo, nickname);
  }

  async updateUserDescription(
    tokenUserNo: number,
    userNo: number,
    body: UpdateUserDescriptionDto,
  ) {
    if (tokenUserNo !== userNo) {
      throw new ForbiddenException("User can only fix their own description.");
    }

    const { description } = body;

    return this.userRepository.updateUserDescription(userNo, description);
  }

  async getUsersByAnimal(queryParams: GetUsersByAnimalDto) {
    const { pageNo, take, animal, orderByField, nickname } = queryParams;

    const skip = (pageNo - 1) * take;
    const sort = orderByField === "createdAt" ? "asc" : "desc";

    let where = {
      nickname: { contains: nickname },
      characterLocker: {},
    };

    if (animal) {
      where.characterLocker = {
        some: { status: true, character: { species: animal } },
      };
    }

    const result = await this.userRepository.getUsersByAnimal(
      take,
      orderByField,
      skip,
      sort,
      where,
    );

    return result;
  }
}
