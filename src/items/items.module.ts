import { Module } from "@nestjs/common";
import { ItemsService } from "./items.service";
import { ItemsController } from "./items.controller";
import { ItemsRepository } from "./items.repository";

@Module({
  providers: [ItemsService],
  controllers: [ItemsController, ItemsRepository],
})
export class ItemsModule {}
