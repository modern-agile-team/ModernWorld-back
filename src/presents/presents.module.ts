import { Module } from "@nestjs/common";
import { PresentsController } from "./presents.controller";
import { PresentsService } from "./presents.service";
import { PresentsRepository } from "./presents.repository";
import { InventoryModule } from "src/inventory/inventory.module";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [InventoryModule, UsersModule],
  controllers: [PresentsController],
  providers: [PresentsService, PresentsRepository],
})
export class PresentsModule {}
