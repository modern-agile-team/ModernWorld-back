import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { InventoryService } from "./inventory.service";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { GetUserItemsDto } from "./dtos/get-user-items.dto";
import { UpdateUserItemStatusDto } from "./dtos/update-user-item-status.dto";
import { ApiGetUserItems } from "./inventory-swagger/get-user-items.decorator";
import { ApiCreateUserItem } from "./inventory-swagger/create-user-item.decorator";
import { ApiUpdateUserItem } from "./inventory-swagger/update-user-item.decorator";
import { ItemNoDto } from "./dtos/item-no.dto";

@Controller()
@ApiTags("Inventory")
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get("users/:userNo/items")
  @ApiParam({ name: "userNo", example: 1 })
  @ApiGetUserItems()
  getUserItems(
    @Param("userNo", ParseIntPipe) userNo: number,
    @Query() query: GetUserItemsDto,
  ) {
    return this.inventoryService.getUserItems(userNo, query);
  }

  @Post("users/items")
  @ApiCreateUserItem()
  createUserOneItem(@Body() body: ItemNoDto) {
    const userNo = 1;

    return this.inventoryService.createUserOneItem(userNo, body);
  }

  @Put("users/items/:itemNo/status")
  @ApiUpdateUserItem()
  updateItemStatus(
    @Param() param: ItemNoDto,
    @Body() body: UpdateUserItemStatusDto,
  ) {
    const userNo = 1;

    return this.inventoryService.updateItemStatus(userNo, param, body);
  }
}
