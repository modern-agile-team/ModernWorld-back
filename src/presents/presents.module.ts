import { Module } from "@nestjs/common";
import { PresentsController } from "./presents.controller";
import { PresentsService } from "./presents.service";
import { PresentsRepository } from "./presents.repository";
import { InventoryModule } from "src/inventory/inventory.module";

@Module({
  imports: [InventoryModule],
  controllers: [PresentsController],
  providers: [PresentsService, PresentsRepository],
  exports: [PresentsService],
})
export class PresentsModule {}
