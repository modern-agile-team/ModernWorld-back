import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { InventoryService } from "./inventory.service";

@Controller("inventory")
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post(":itemNo")
  buyItem(@Param("itemNo", ParseIntPipe) itemNo: number) {
    const userNo = 1;

    return this.inventoryService.buyOneItem(userNo, itemNo);
  }

  @Patch(":itemNo")
  useItem(@Param("itemNo", ParseIntPipe) itemNo: number) {
    const userNo = 1;

    return this.inventoryService.useItemDisuseOthers(userNo, itemNo);
  }

  //유저 방 조회
  @Get(":userNo/room")
  showUserRoom(@Param("userNo") userNo: number) {
    return this.inventoryService.getUserRoom(userNo);
  }
}
