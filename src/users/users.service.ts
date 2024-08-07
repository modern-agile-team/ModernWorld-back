import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { GetUsersByAnimalDto } from "./dtos/get-users-by-animal.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserNicknameDto } from "./dtos/update-user-nickname.dto";
import { UpdateUserDescriptionDto } from "./dtos/update-user-description.dto";
import { Prisma, UserDomain } from "@prisma/client";
import { PaginationResponseDto } from "src/common/dtos/pagination-response.dto";
import { CommonService } from "src/common/common.service";
import { LegendsRepository } from "src/legends/legends.repository";
import { UpdateUserAttendanceDto } from "./dtos/update-user-attendance.dto";

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userRepository: UsersRepository,
    private readonly logger: Logger,
    private readonly commonService: CommonService,
    private readonly legendsRepository: LegendsRepository,
  ) {}

  getOneUser(userNo: number) {
    return this.userRepository.getOneUser(userNo);
  }

  getUserAttendance(userNo: number) {
    return this.userRepository.getUserAttendance(userNo);
  }

  async updateUserAttendance(userNo: number, body: UpdateUserAttendanceDto) {
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

    const { stickerNo } = body;

    const offset = 1000 * 60 * 60 * 9;
    const today = new Date(Date.now() + offset); // GMT + 9 = 한국시각 (ms) 한국시각 반환함
    const day = today.getUTCDay(); //getDay()는 현재 로컬환경시각인 +9를 더해주는 바람에 안됨(뇌피셜)

    const { attendance } = await this.userRepository.getUserAttendance(userNo);

    if (attendance[day][0]) {
      throw new ConflictException("already attended");
    }

    attendance[day][0] = stickerNo;

    try {
      const [userAttendance] = await this.prisma.$transaction([
        this.userRepository.updateUserAttendance(userNo, attendance),

        this.userRepository.updateUserCurrentPointAccumulationPoint(
          userNo,
          attendance[day][1],
        ),

        this.legendsRepository.updateOneLegendByUserNo(userNo, {
          attendanceCount: { increment: 1 },
        }),
      ]);

      this.commonService.checkAchievementCondition(userNo, "attendanceCount");

      return userAttendance;
    } catch (err) {
      this.logger.error(`transaction Error : ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async createUserNickname(userNo: number, body: UpdateUserNicknameDto) {
    const { nickname: userName } =
      await this.userRepository.findUserByUserNo(userNo);

    if (userName) {
      throw new ConflictException("User already has a nickname.");
    }

    const { nickname } = body;

    const duplicatedName =
      await this.userRepository.findUserNicknameByNickname(nickname);

    if (duplicatedName) {
      throw new ConflictException(`'${nickname}' is duplicated.`);
    }

    return this.userRepository.updateUserNickname(userNo, nickname);
  }

  updateUserDescription(userNo: number, body: UpdateUserDescriptionDto) {
    const { description } = body;

    return this.userRepository.updateUserDescription(userNo, description);
  }

  async getUsers(query: GetUsersByAnimalDto) {
    const { page, take, animal, orderByField, nickname } = query;
    const skip = (page - 1) * take;

    const where = {
      nickname: { contains: nickname, not: null },
      characterLocker: animal
        ? { some: { status: true, character: { species: animal } } }
        : {},
      deletedAt: null,
    };

    const orderBy =
      orderByField === "like"
        ? [{ legend: { likeCount: "desc" } }, { no: "desc" }]
        : [{ [orderByField]: "desc" }, { no: "desc" }];

    const totalCount = await this.userRepository.countUsers(where);
    const totalPage = Math.ceil(totalCount / take);
    const users = await this.userRepository.getUsers(
      take,
      skip,
      orderBy,
      where,
    );

    return new PaginationResponseDto(users, {
      page,
      take,
      totalCount,
      totalPage,
    });
  }
}
