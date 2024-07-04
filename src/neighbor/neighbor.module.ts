import { Module } from "@nestjs/common";
import { NeighborService } from "./neighbor.service";
import { NeighborController } from "./neighbor.controller";
import { NeighborRepository } from "./neighbor.repository";

@Module({
  controllers: [NeighborController],
  providers: [NeighborService, NeighborRepository],
})
export class NeighborModule {}
