import { Injectable } from "@nestjs/common";
import { AchievementsRepository } from "src/achievements/achievements.repository";
import { AlarmsRepository } from "src/alarms/alarms.repository";
import { UpdateLegendCount } from "src/legends/interfaces/update-legend-count.interface";
import { LegendsRepository } from "src/legends/legends.repository";
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
  ) {}

  async recordLegendAndCheckAchievement(
    userNo: number,
    legendOneField: keyof UpdateLegendCount,
  ) {
    //유저가 해당하는 행위를 몇번 했는지 기록

    const updateLegendCount: UpdateLegendCount = {
      [legendOneField]: { increment: 1 },
    };

    const updatedLegend = await this.legendsRepository.updateLegendByUserNo(
      userNo,
      updateLegendCount,
    );

    switch (updatedLegend[`${legendOneField}`]) {
      case 10:
        this.checkAchievementConditon(userNo, legendOneField + 1);
        break;
      case 20:
        this.checkAchievementConditon(userNo, legendOneField + 2);
        break;
      case 40:
        this.checkAchievementConditon(userNo, legendOneField + 3);
    }
    return 0;
  }

  private async checkAchievementConditon(
    userNo: number,
    legendOneFieldWithNumber: string,
  ) {
    if (
      //해당 하는 업적을 가지고 있는지 확인
      !(await this.usersAchievementsRepository.findOneAchievementByName(
        userNo,
        legendOneFieldWithNumber,
      ))
    ) {
      //해당 업적 정보얻기
      const { no, point, title } =
        await this.achievementsRepository.getAchievementNoByName(
          legendOneFieldWithNumber,
        );

      //관련로직 transaction으로 묶어놓기!!--------------------------------------

      //유저 업적 테이블에 업적 추가
      this.usersAchievementsRepository.createOneUserAchievement(userNo, no);

      //유저 포인트 늘리기
      this.usersRepository.updateUserCurrentPointAccumulationPoint(
        userNo,
        point,
      );

      //알람 테이블에 알람 추가
      this.alarmsRepository.createOneAlarm(
        userNo,
        `업적 [${title}]을 달성했습니다!`,
        "/user-achievements", // 해당 항목 반드시 유심히 볼것, 추후 변경 가능성 농후--------------------------------------------------------------------------------
      );

      //sse 알람 보내기
      this.sseService.sendSse(userNo, `업적 [${title}]을 달성했습니다!`);
    }
  }
}
