import { Module } from "@nestjs/common";
import { LegendsRepository } from "./legends.repository";

@Module({
  providers: [LegendsRepository],
  exports: [LegendsRepository],
})
export class LegendsModule {}
