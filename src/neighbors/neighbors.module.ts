import { Module } from "@nestjs/common";
import { NeighborService } from "./neighbors.service";
import { NeighborController } from "./neighbors.controller";
import { NeighborRepository } from "./neighbors.repository";

@Module({
  controllers: [NeighborController],
  providers: [NeighborService, NeighborRepository],
})
export class NeighborModule {}
