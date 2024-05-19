import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { GetUsersByAnimalDto } from "./dtos/get-users-by-animal.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserNicknameDto } from "./dtos/update-user-nickname.dto";
import { UpdateUserDescriptionDto } from "./dtos/update-user-description.dto";
import { DomainEnum } from "./enum/domain-enum";

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userRepository: UsersRepository,
  ) {}

  getUserNamePointTitleCharacter(userNo: number) {
    return this.userRepository.getUserNamePointTitleCharacter(userNo);
  }

  async createUser(
    uniqueIdentifier: string,
    socialName: string,
    image: string,
    domain: DomainEnum,
  ) {
    const result = await this.userRepository.createUser(
      uniqueIdentifier,
      socialName,
      image,
      domain,
    );
    return result;
  }

  async getUserAttendance(userNo: number) {
    return this.userRepository.getUserAttendance(userNo);
  }

  async updateUserAttendance(userNo: number) {
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
    /** 출석부의 형식은 다음과 같다. Json형태임
     * {"0": [false, 100], "1": [false, 200], "2": [false, 300], "3": [false, 200], "4": [false, 400], "5": [true, 300], "6": [false, 300]}
     *
     * true가 출석했다는 의미, 그 뒤의 수는 출석했을 시 얻을 포인트
     */

    const offset = 1000 * 60 * 60 * 9;
    const today = new Date(Date.now() + offset); // GMT + 9 = 한국시각 (ms) 한국시각 반환함
    const day = today.getUTCDay(); //getDay()는 현재 로컬환경시각인 +9를 더해주는 바람에 안됨(뇌피셜)

    let attendance = (await this.userRepository.getUserAttendance(userNo))
      .attendance;

    if (attendance[day][0]) {
      throw new ConflictException("already attended");
    }

    attendance[day][0] = true;

    //짧게나마 트랜잭션을 구현했으나, 이는 나중에 좀더 수정해야 할듯함.
    try {
      this.prisma.$transaction([
        this.userRepository.updateUserAttendance(userNo, attendance),

        this.userRepository.updateUserCurrentPointAccumulationPoint(
          userNo,
          attendance[day][1],
        ),
      ]);

      return true;
    } catch (error) {
      throw new InternalServerErrorException("transaction error.");
    }
  }

  async updateUserNickname(userNo: number, body: UpdateUserNicknameDto) {
    const { nickname: userName } =
      await this.userRepository.findUserNicknameByUserNo(userNo);

    if (userName) {
      throw new ForbiddenException("User already has a nickname.");
    }

    const { nickname } = body;

    const duplicatedName =
      await this.userRepository.findUserNicknameByNickname(nickname);

    if (duplicatedName) {
      throw new ForbiddenException(`'${nickname}' is duplicated.`);
    }

    return this.userRepository.updateUserNickname(userNo, nickname);
  }

  async updateUserDescription(userNo: number, body: UpdateUserDescriptionDto) {
    const { description } = body;

    return this.userRepository.updateUserDescription(userNo, description);
  }

  async getUsers(queryParams: GetUsersByAnimalDto) {
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

    const result = await this.userRepository.getUsers(
      take,
      orderByField,
      skip,
      sort,
      where,
    );

    return result;
  }
}
