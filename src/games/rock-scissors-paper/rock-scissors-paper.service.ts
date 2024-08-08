import { ForbiddenException, Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RockScissorsPaperDto } from "./dtos/rock-scissors-paper.dto";
import { LegendsRepository } from "src/legends/legends.repository";
import { UsersRepository } from "src/users/users.repository";
import { RockScissorsPaperRepository } from "./rock-scissors-paper.repository";
import { AlarmsRepository } from "src/alarms/alarms.repository";
import { SseService } from "src/sse/sse.service";
import { REWARD_POINT } from "../constants/reward-point.constant";
import { GetDateDto } from "./dtos/get-date.dto";
import { UserAchievementsService } from "src/user-achievements/user-achievements.service";

@Injectable()
export class RockScissorsPaperService {
  constructor(
    private readonly logger: Logger,
    private readonly prisma: PrismaService,
    private readonly legendsRepository: LegendsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly RSPRepository: RockScissorsPaperRepository,
    private readonly alarmsRepository: AlarmsRepository,
    private readonly sseService: SseService,
    private readonly userAchievementsService: UserAchievementsService,
  ) {}

  async createRSPRecord(userNo: number, body: RockScissorsPaperDto) {
    // 가위 : 0, 바위 : 1, 보 : 2 패배 : 3
    const { chance } = await this.usersRepository.findUserByUserNo(userNo);

    if (chance === 0)
      throw new ForbiddenException("User doesn't have a chance");

    const { choice } = body;
    const random = Math.floor(Math.random() * 3);

    const computer = this.convertChoiceToString(random);

    if (choice === 3) {
      return this.drawOrLose(userNo, "-", computer, "lose");
    }

    const user = this.convertChoiceToString(choice);

    if (choice === random) {
      return this.drawOrLose(userNo, user, computer, "draw");
    }

    // 유저가 가위일 때
    if (choice === 0) {
      if (random === 1) {
        return this.drawOrLose(userNo, user, computer, "lose");
      }
      return this.win(userNo, user, computer);
    }

    // 유저가 바위일 때
    if (choice === 1) {
      if (random === 2) {
        return this.drawOrLose(userNo, user, computer, "lose");
      }
      return this.win(userNo, user, computer);
    }

    // 유저가 보일 때
    if (choice === 2) {
      if (random === 0) {
        return this.drawOrLose(userNo, user, computer, "lose");
      }
      return this.win(userNo, user, computer);
    }
  }

  private convertChoiceToString(choice: number) {
    if (choice === 0) {
      return "Scissors";
    }

    if (choice === 1) {
      return "Rock";
    }

    if (choice === 2) {
      return "Paper";
    }
  }

  async getRSPRecords(userNo: number, query: GetDateDto) {
    const { date } = query;

    const records = await this.RSPRepository.getRecords(userNo, date);

    return records;
  }

  private async win(userNo: number, user: string, computer: string) {
    let result;

    try {
      [, , , , result] = await this.prisma.$transaction([
        this.usersRepository.updateUserCurrentPointAccumulationPoint(
          userNo,
          REWARD_POINT.RSP_REWARD,
        ),

        this.usersRepository.updateUserChance(userNo, -1),

        this.legendsRepository.updateOneLegendByUserNo(userNo, {
          RSPWinCount: { increment: 1 },
        }),

        this.alarmsRepository.createOneAlarm(
          userNo,
          `[가위 바위 보 게임]에서 승리하셨습니다! ${REWARD_POINT.RSP_REWARD}포인트를 획득하셨습니다!`,
          "게임",
        ),

        this.RSPRepository.createOneRecord(userNo, user, computer, "win"),
      ]);
    } catch (err) {
      this.logger.error(`transaction Error : ${err}`);
    }

    this.userAchievementsService.checkAchievementCondition(
      userNo,
      "RSPWinCount",
    );

    this.sseService.sendSse(userNo, {
      title: "게임",
      content: `[가위 바위 보 게임]에서 승리하셨습니다! ${REWARD_POINT.RSP_REWARD}포인트를 획득하셨습니다!`,
    });

    return result;
  }

  private async drawOrLose(
    userNo: number,
    user: string,
    computer: string,
    gameResult: "lose" | "draw",
  ) {
    try {
      const [, result] = await this.prisma.$transaction([
        this.usersRepository.updateUserChance(userNo, -1),

        this.RSPRepository.createOneRecord(userNo, user, computer, gameResult),
      ]);

      return result;
    } catch (err) {
      this.logger.error(`transaction Error : ${err}`);
    }
  }
}
