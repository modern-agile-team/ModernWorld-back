import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { AchievementsRepository } from "src/achievements/achievements.repository";
import { AlarmsRepository } from "src/alarms/alarms.repository";
import { UpdateLegendCount } from "src/legends/interfaces/update-legend-count.interface";
import { LegendsRepository } from "src/legends/legends.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { SseService } from "src/sse/sse.service";
import { UserAchievementsRepository } from "src/user-achievements/user-achievements.repository";
import { UsersRepository } from "src/users/users.repository";

@Injectable()
export class CommonService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly alarmsRepository: AlarmsRepository,
    private readonly sseService: SseService,
    private readonly legendsRepository: LegendsRepository,
    private readonly usersAchievementsRepository: UserAchievementsRepository,
    private readonly achievementsRepository: AchievementsRepository,
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) {}

  async checkAchievementCondition(
    userNo: number,
    legendField: keyof UpdateLegendCount,
  ) {
    const userLegend =
      await this.legendsRepository.getAllLegendsByUserNo(userNo);

    // 해당하는 개수 별로 흭득할수 있는 업적 설정
    // 총 15개의 업적. 5(업적 종류) * 3(업적단계) legend table의 feild 값이10, 20, 40일떄 이벤트 발생
    // achievement name은 ~Count1, ~Count2, ~Count3로 구성됨 사실 이러면 name의 역할은 DB 검색용 역할로 전락함
    // 그러나 title(칭호)가 있으니까 프론트는 이거쓰면 됨ㅇㅇ
    switch (userLegend[`${legendField}`]) {
      case 10:
        this.checkAchievementAndGet(userNo, legendField + 1);
        break;
      case 20:
        this.checkAchievementAndGet(userNo, legendField + 2);
        break;
      case 40:
        this.checkAchievementAndGet(userNo, legendField + 3);
    }
  }

  private async checkAchievementAndGet(
    userNo: number,
    legendFieldWithNumber: string,
  ) {
    if (
      //해당 하는 업적을 가지고 있는지 확인
      !(await this.usersAchievementsRepository.findOneAchievementByName(
        userNo,
        legendFieldWithNumber,
      ))
    ) {
      //해당 업적 정보얻기
      const { no, point, title } =
        await this.achievementsRepository.getAchievementNoByName(
          legendFieldWithNumber,
        );

      try {
        await this.prisma.$transaction([
          //유저 업적 테이블에 업적 추가
          this.usersAchievementsRepository.createOneUserAchievement(userNo, no),

          //유저 포인트 늘리기
          this.usersRepository.updateUserCurrentPointAccumulationPoint(
            userNo,
            point,
          ),

          //알람 테이블에 알람 추가
          this.alarmsRepository.createOneAlarm(
            userNo,
            `업적 [${title}]을 달성했습니다! ${point}포인트를 흭득하셨습니다!`,
            "업적",
          ),
        ]);
      } catch (err) {
        this.logger.error(`transaction Error : ${err}`);
        throw new InternalServerErrorException();
      }

      this.sseService.sendSse(userNo, {
        title: "업적",
        content: `업적 [${title}]을 달성했습니다! ${point}포인트를 흭득하셨습니다!`,
      });
    }
  }
}
