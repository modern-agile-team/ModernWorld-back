import { Module } from "@nestjs/common";
import { InventoryService } from "./inventory.service";
import { InventoryRepository } from "./inventory.repository";

@Module({
  providers: [InventoryService, InventoryRepository],
  exports: [InventoryRepository],
})
export class InventoryModule {}
