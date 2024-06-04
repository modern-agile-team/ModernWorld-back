import { Module } from "@nestjs/common";
import { LegendsRepository } from "./legends.repository";

@Module({
  providers: [LegendsRepository],
})
export class LegendsModule {}
