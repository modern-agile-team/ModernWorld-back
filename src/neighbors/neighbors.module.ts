import { Module } from "@nestjs/common";
import { NeighborsService } from "./neighbors.service";
import { NeighborsController } from "./neighbors.controller";
import { NeighborsRepository } from "./neighbors.repository";
import { UsersModule } from "src/users/users.module";

@Module({
  controllers: [NeighborsController],
  providers: [NeighborsService, NeighborsRepository],
  imports: [UsersModule],
})
export class NeighborModule {}
