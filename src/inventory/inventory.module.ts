import { Module } from "@nestjs/common";
import { InventoryService } from "./inventory.service";
import { InventoryRepository } from "./inventory.repository";
import { InventoryController } from "./inventory.controller";
import { ItemsModule } from "src/items/items.module";
import { UsersModule } from "src/users/users.module";
import { LegendsModule } from "src/legends/legends.module";
import { CommonModule } from "src/common/common.module";

@Module({
  imports: [ItemsModule, UsersModule, LegendsModule, CommonModule],
  controllers: [InventoryController],
  providers: [InventoryService, InventoryRepository],
  exports: [InventoryRepository],
})
export class InventoryModule {}
