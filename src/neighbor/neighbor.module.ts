import { Module } from '@nestjs/common';
import { NeighborService } from './neighbor.service';
import { NeighborController } from './neighbor.controller';

@Module({
  controllers: [NeighborController],
  providers: [NeighborService],
})
export class NeighborModule {}
