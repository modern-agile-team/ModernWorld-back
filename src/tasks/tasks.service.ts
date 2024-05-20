import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class TasksService {
  @Cron("* * * * * *")
  test() {
    console.log("뭉탱이");
  }
}
