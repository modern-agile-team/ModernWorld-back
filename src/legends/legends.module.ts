import { Module } from "@nestjs/common";
import { LegendsRepository } from "./legends.repository";
import { LegendsController } from './legends.controller';
import { LegendsService } from './legends.service';

@Module({
  providers: [LegendsRepository, LegendsService],
  exports: [LegendsRepository],
  controllers: [LegendsController],
})
export class LegendsModule {}
