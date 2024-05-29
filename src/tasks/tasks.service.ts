import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { UsersRepository } from "src/users/users.repository";

@Injectable()
export class TasksService {
  constructor(private readonly usersRepository: UsersRepository) {}

  @Cron("0 0 0 * * 1", {
    timeZone: "Asia/seoul",
  })
  resetUserAttendance() {
    //0 0 0 * * 1 - 매주 월요일 00시 00분 00초

    try {
      return this.usersRepository.resetUserAttendance();
    } catch {
      throw new InternalServerErrorException("transaction error");
    }
  }
}
