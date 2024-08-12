import { Module } from "@nestjs/common";
import { PresentsController } from "./presents.controller";
import { PresentsService } from "./presents.service";
import { PresentsRepository } from "./presents.repository";
import { InventoryModule } from "src/inventory/inventory.module";
import { UsersModule } from "src/users/users.module";
import { ItemsModule } from "src/items/items.module";
import { LegendsModule } from "src/legends/legends.module";
import { AlarmsModule } from "src/alarms/alarms.module";
import { SseModule } from "src/sse/sse.module";
import { UserAchievementsModule } from "src/user-achievements/user-achievements.module";

@Module({
  imports: [
    InventoryModule,
    UsersModule,
    ItemsModule,
    LegendsModule,
    SseModule,
    AlarmsModule,
    UserAchievementsModule,
  ],
  controllers: [PresentsController],
  providers: [PresentsService, PresentsRepository],
})
export class PresentsModule {}
