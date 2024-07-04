import { Module } from "@nestjs/common";
import { CommonService } from "./common.service";
import { UsersModule } from "src/users/users.module";
import { LegendsModule } from "src/legends/legends.module";
import { UserAchievementsModule } from "src/user-achievements/user-achievements.module";
import { SseModule } from "src/sse/sse.module";
import { AlarmsModule } from "src/alarms/alarms.module";
import { CommonController } from "./common.controller";

@Module({
  imports: [
    UsersModule,
    LegendsModule,
    UserAchievementsModule,
    SseModule,
    AlarmsModule,
  ],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
