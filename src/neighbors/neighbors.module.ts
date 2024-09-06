import { Module } from "@nestjs/common";
import { NeighborsService } from "./neighbors.service";
import { NeighborsController } from "./neighbors.controller";
import { NeighborsRepository } from "./neighbors.repository";
import { UsersModule } from "src/users/users.module";
import { AlarmsModule } from "src/alarms/alarms.module";

@Module({
  controllers: [NeighborsController],
  providers: [NeighborsService, NeighborsRepository],
  imports: [UsersModule, AlarmsModule],
})
export class NeighborsModule {}
