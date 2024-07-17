import { Module } from "@nestjs/common";
import { NeighborService } from "./neighbors.service";
import { NeighborController } from "./neighbors.controller";
import { NeighborRepository } from "./neighbors.repository";
import { UsersModule } from "src/users/users.module";

@Module({
  controllers: [NeighborController],
  providers: [NeighborService, NeighborRepository],
  imports: [UsersModule],
})
export class NeighborModule {}
