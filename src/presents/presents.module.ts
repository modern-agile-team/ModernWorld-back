import { Module } from "@nestjs/common";
import { PresentsController } from "./presents.controller";
import { PresentsService } from "./presents.service";
import { PresentsRepository } from "./presents.repository";

@Module({
  controllers: [PresentsController],
  providers: [PresentsService, PresentsRepository],
})
export class PresentsModule {}
