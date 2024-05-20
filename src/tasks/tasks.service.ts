import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class TasksService {
  @Cron("* * * * * *", {
    timeZone: "Asia/seoul",
  })
  test() {
    //0 0 0 * * 1 - 매주 월요일 00시 00분
    console.log("뭉탱이");
  }
}
