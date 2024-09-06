import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { GetUsersByAnimalDto } from "./dtos/get-users-by-animal.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserNicknameDto } from "./dtos/update-user-nickname.dto";
import { UpdateUserDescriptionDto } from "./dtos/update-user-description.dto";
import { Prisma } from "@prisma/client";
import { LegendsRepository } from "src/legends/legends.repository";
import { UpdateUserAttendanceDto } from "./dtos/update-user-attendance.dto";
import { UserAchievementsService } from "src/user-achievements/user-achievements.service";

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersRepository: UsersRepository,
    private readonly logger: Logger,
    private readonly legendsRepository: LegendsRepository,
    private readonly userAchievementsService: UserAchievementsService,
  ) {}

  getOneUser(userNo: number) {
    return this.usersRepository.getOneUser(userNo);
  }

  getUserAttendance(userNo: number) {
    return this.usersRepository.getUserAttendance(userNo);
  }

  async checkAdmin(userNo: number) {
    const { admin } = await this.usersRepository.isAdmin(userNo);

    if (!admin) throw new ForbiddenException("You are not admin.");
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

    const { attendance } = await this.usersRepository.getUserAttendance(userNo);

    if (attendance[day][0]) {
      throw new ConflictException("already attended");
    }

    attendance[day][0] = stickerNo;

    try {
      return this.prisma.$transaction(async (tx) => {
        await this.usersRepository.updateUserCurrentPointAccumulationPoint(
          userNo,
          attendance[day][1],
          tx,
        );

        await this.legendsRepository.updateOneLegendByUserNo(
          userNo,
          {
            attendanceCount: { increment: 1 },
          },
          tx,
        );

        await this.userAchievementsService.checkAchievementCondition(
          userNo,
          "attendanceCount",
          tx,
        );

        return this.usersRepository.updateUserAttendance(
          userNo,
          attendance,
          tx,
        );
      });
    } catch (err) {
      this.logger.error(`transaction Error : ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async createUserNickname(userNo: number, body: UpdateUserNicknameDto) {
    const { nickname: userName } =
      await this.usersRepository.findUserByUserNo(userNo);

    if (userName) {
      throw new ConflictException("User already has a nickname.");
    }

    const { nickname } = body;

    const duplicatedName =
      await this.usersRepository.findUserNicknameByNickname(nickname);

    if (duplicatedName) {
      throw new ConflictException(`'${nickname}' is duplicated.`);
    }

    return this.usersRepository.updateUserNickname(userNo, nickname);
  }

  updateUserDescription(userNo: number, body: UpdateUserDescriptionDto) {
    const { description } = body;

    return this.usersRepository.updateUserDescription(userNo, description);
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

    const totalCount = await this.usersRepository.countUsers(where);
    const totalPage = Math.ceil(totalCount / take);
    const users = await this.usersRepository.getUsers(
      take,
      skip,
      orderBy,
      where,
    );

    return { users, page, take, totalCount, totalPage };
  }

  async userExists(userNo: number, message: string = "User doesn't exist.") {
    const user = await this.usersRepository.findUserByUserNo(userNo);

    if (!user) throw new NotFoundException(message);
  }
}
