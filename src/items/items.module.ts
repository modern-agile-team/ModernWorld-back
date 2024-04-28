import { Module } from "@nestjs/common";
import { ItemsService } from "./items.service";
import { ItemsController } from "./items.controller";
import { ItemsRepository } from "./items.repository";
import { InventoryModule } from "src/inventory/inventory.module";

@Module({
  imports: [InventoryModule],
  controllers: [ItemsController],
  providers: [ItemsService, ItemsRepository],
})
export class ItemsModule {}
