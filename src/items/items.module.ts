import { Module } from "@nestjs/common";
import { ItemsService } from "./items.service";
import { ItemsController } from "./items.controller";
import { ItemsRepository } from "./items.repository";
import { InventoryModule } from "src/inventory/inventory.module";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [InventoryModule, UsersModule],
  controllers: [ItemsController],
  providers: [ItemsService, ItemsRepository],
  exports: [ItemsRepository],
})
export class ItemsModule {}
