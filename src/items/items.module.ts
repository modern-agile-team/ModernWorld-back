import { Module } from "@nestjs/common";
import { ItemsService } from "./items.service";
import { ItemsController } from "./items.controller";
import { ItemsRepository } from "./items.repository";
import { InventoryModule } from "src/inventory/inventory.module";
import { UserRepository } from "src/users/users.repository";

@Module({
  imports: [InventoryModule],
  controllers: [ItemsController],
  providers: [ItemsService, ItemsRepository, UserRepository],
})
export class ItemsModule {}
