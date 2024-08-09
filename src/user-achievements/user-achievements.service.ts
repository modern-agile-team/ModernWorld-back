import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { UserAchievementsRepository } from "./user-achievements.repository";
import { updateUserAchievementStatusDto } from "./dtos/update-user-achievement-status.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { SseService } from "src/sse/sse.service";
import { UsersRepository } from "src/users/users.repository";
import { LegendsRepository } from "src/legends/legends.repository";
import { AchievementsRepository } from "src/achievements/achievements.repository";
import { UpdateLegendCount } from "src/legends/interfaces/update-legend-count.interface";
import { AlarmsRepository } from "src/alarms/alarms.repository";
import { PrismaTxType } from "src/prisma/prisma.type";

@Injectable()
export class UserAchievementsService {
  constructor(
    private readonly logger: Logger,
    private readonly prisma: PrismaService,
    private readonly sseService: SseService,
    private readonly usersRepository: UsersRepository,
    private readonly legendsRepository: LegendsRepository,
    private readonly userAchievementsRepository: UserAchievementsRepository,
    private readonly achievementsRepository: AchievementsRepository,
    private readonly alarmsRepository: AlarmsRepository,
  ) {}

  getUserAchievements(userNo: number) {
    return this.userAchievementsRepository.getUserAchievements(userNo);
  }

  async updateUserAchievementStatus(
    userNo: number,
    achievementNo: number,
    body: updateUserAchievementStatusDto,
  ) {
    const { status } = body;
    const userAchievement =
      await this.userAchievementsRepository.findOneUserAchievement(
        userNo,
        achievementNo,
      );

    if (!userAchievement)
      throw new NotFoundException("User doesn't have that Achievement.");

    if (!status)
      return this.userAchievementsRepository.updateUserAchievementStatusByNo(
        userAchievement.no,
        status,
      );

    try {
      const [, result] = await this.prisma.$transaction([
        this.userAchievementsRepository.updateUserAchievementStatus(
          userNo,
          false,
        ),

        this.userAchievementsRepository.updateUserAchievementStatusByNo(
          userAchievement.no,
          status,
        ),
      ]);

      return result;
    } catch (err) {
      this.logger.error(`transaction Error : ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async checkAchievementCondition(
    userNo: number,
    legendField: keyof UpdateLegendCount,
    tx: PrismaTxType,
  ) {
    const userLegend = await this.legendsRepository.getAllLegendsByUserNo(
      userNo,
      tx,
    );

    // 해당하는 개수 별로 흭득할수 있는 업적 설정
    // 총 15개의 업적. 5(업적 종류) * 3(업적단계) legend table의 feild 값이10, 20, 40일떄 이벤트 발생
    // achievement name은 ~Count1, ~Count2, ~Count3로 구성됨 사실 이러면 name의 역할은 DB 검색용 역할로 전락함
    // 그러나 title(칭호)가 있으니까 프론트는 이거쓰면 됨ㅇㅇ
    switch (userLegend[`${legendField}`]) {
      case 10:
        await this.checkAchievementAndGet(userNo, legendField + 1, tx);
        break;
      case 20:
        await this.checkAchievementAndGet(userNo, legendField + 2, tx);
        break;
      case 40:
        await this.checkAchievementAndGet(userNo, legendField + 3, tx);
    }
  }

  private async checkAchievementAndGet(
    userNo: number,
    legendFieldWithNumber: string,
    tx: PrismaTxType,
  ) {
    if (
      //해당 하는 업적을 가지고 있는지 확인
      !(await this.userAchievementsRepository.findOneAchievementByName(
        userNo,
        legendFieldWithNumber,
      ))
    ) {
      //해당 업적 정보얻기
      const achievement =
        await this.achievementsRepository.getAchievementNoByName(
          legendFieldWithNumber,
        );

      if (!achievement) {
        this.logger.error(
          `Error: There is no such achievement in DB. Name: ${legendFieldWithNumber}`,
        );
      }

      const { no, point, title } = achievement;

      //유저 업적 테이블에 업적 추가
      await this.userAchievementsRepository.createOneUserAchievement(
        userNo,
        no,
        tx,
      );

      //유저 포인트 늘리기
      await this.usersRepository.updateUserCurrentPointAccumulationPoint(
        userNo,
        point,
        tx,
      );

      //알람 테이블에 알람 추가
      await this.alarmsRepository.createOneAlarm(
        userNo,
        `업적 [${title}]을 달성했습니다! ${point}포인트를 흭득하셨습니다!`,
        "업적",
        tx,
      );

      this.sseService.sendSse(userNo, {
        title: "업적",
        content: `업적 [${title}]을 달성했습니다! ${point}포인트를 흭득하셨습니다!`,
      });
    }
  }
}
