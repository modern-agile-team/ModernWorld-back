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

  async recordLegendAndCheckAchievement<T extends keyof UpdateLegendCount>(
    userNo: number,
    legendOneField: keyof UpdateLegendCount,
  ) {
    //유저가 해당하는 행위를 몇번 했는지 기록
    const updateLegendCount: Pick<UpdateLegendCount, T> = {
      [legendOneField]: { increment: 1 },
    } as Pick<UpdateLegendCount, T>;
    // type casting? assertion? 타입 단언 처음알았음..ㄷㄷ
    // 내 손모가지를 걸고 타입은 이거다.

    const updatedLegend = await this.legendsRepository.updateLegendByUserNo(
      userNo,
      updateLegendCount,
    );

    // 해당하는 개수 별로 흭득할수 있는 업적 설정
    // 총 15개의 업적. 5(업적 종류) * 3(업적단계) legend table의 feild 값이10, 20, 40일떄 이벤트 발생
    // achievement name은 ~Count1, ~Count2, ~Count3로 구성됨 사실 이러면 name의 역할은 DB 검색용 역할로 전락함
    // 그러나 title(칭호)가 있으니까 프론트는 이거쓰면 됨ㅇㅇ
    switch (updatedLegend[`${legendOneField}`]) {
      case 10:
        this.checkAchievementConditonAndGet(userNo, legendOneField + 1);
        break;
      case 20:
        this.checkAchievementConditonAndGet(userNo, legendOneField + 2);
        break;
      case 40:
        this.checkAchievementConditonAndGet(userNo, legendOneField + 3);
    }
  }

  private async checkAchievementConditonAndGet(
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
        "/user-achievements", // 해당 항목 반드시 유심히 볼것, 추후 변경 가능성 농후-------------------------------------------
      );

      //sse 알람 보내기
      this.sseService.sendSse(userNo, `업적 [${title}]을 달성했습니다!`);
    }
  }
}
