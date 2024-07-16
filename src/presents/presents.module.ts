import { Module } from "@nestjs/common";
import { PresentsController } from "./presents.controller";
import { PresentsService } from "./presents.service";
import { PresentsRepository } from "./presents.repository";
import { InventoryModule } from "src/inventory/inventory.module";
import { UsersModule } from "src/users/users.module";
import { ItemsModule } from "src/items/items.module";
import { CommonModule } from "src/common/common.module";
import { LegendsModule } from "src/legends/legends.module";

@Module({
  imports: [
    InventoryModule,
    UsersModule,
    ItemsModule,
    CommonModule,
    LegendsModule,
  ],
  controllers: [PresentsController],
  providers: [PresentsService, PresentsRepository],
})
export class PresentsModule {}
