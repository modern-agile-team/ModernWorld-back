import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { SseService } from "src/sse/sse.service";
import { UsersRepository } from "src/users/users.repository";

@Injectable()
export class TasksService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly sseService: SseService,
  ) {}

  @Cron("0 0 0 * * 1", {
    timeZone: "Asia/seoul",
  })
  resetUserAttendance() {
    //0 0 0 * * 1 - 매주 월요일 00시 00분 00초

    try {
      return this.usersRepository.resetUserAttendance();
    } catch {
      throw new InternalServerErrorException("Transaction error.");
    }
  }

  // 0 * * * * *
  // 원래는 정각마다 초기화 해주는게 좋을듯, 아래는 10초마다 초기화해줌 10, 20, 30, 40
  @Cron("*/10 * * * * *")
  deleteSseConnection() {
    try {
      return this.sseService.deleteAllSse();
    } catch {
      throw new InternalServerErrorException("Sse initialization error.");
    }
  }
}
