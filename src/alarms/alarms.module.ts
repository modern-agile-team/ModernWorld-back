import { Module } from "@nestjs/common";
import { AlarmsController } from "./alarms.controller";
import { AlarmsService } from "./alarms.service";
import { AlarmsRepository } from "./alarms.repository";

@Module({
  controllers: [AlarmsController],
  providers: [AlarmsService, AlarmsRepository],
  exports: [AlarmsRepository],
})
export class AlarmsModule {}
