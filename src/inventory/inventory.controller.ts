import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { InventoryService } from "./inventory.service";
import { ApiTags } from "@nestjs/swagger";
import { GetUserItemsDto } from "./dtos/get-user-items.dto";
import { UpdateUserItemStatusDto } from "./dtos/update-user-item-status.dto";
import { ApiGetUserItems } from "./inventory-swagger/get-user-items.decorator";
import { ApiCreateUserItem } from "./inventory-swagger/create-user-item.decorator";
import { ApiUpdateUserItem } from "./inventory-swagger/update-user-item.decorator";
import { ItemNoDto } from "./dtos/item-no.dto";
import { ParsePositiveIntPipe } from "src/common/pipes/parse-positive-int.pipe";
import { AccessTokenAuthGuard } from "src/auth/jwt/jwt.guard";
import { UserNo } from "src/auth/auth.decorator";

@Controller()
@ApiTags("Inventory")
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get("users/:userNo/items")
  @ApiGetUserItems()
  @UseGuards(AccessTokenAuthGuard)
  getUserItems(
    @Param("userNo", ParsePositiveIntPipe) userNo: number,
    @Query() query: GetUserItemsDto,
  ) {
    return this.inventoryService.getUserItems(userNo, query);
  }

  @Post("users/my/items")
  @ApiCreateUserItem()
  @UseGuards(AccessTokenAuthGuard)
  createUserOneItem(@UserNo() userNo: number, @Body() body: ItemNoDto) {
    return this.inventoryService.createUserOneItem(userNo, body);
  }

  @Patch("users/my/items/:itemNo")
  @ApiUpdateUserItem()
  @UseGuards(AccessTokenAuthGuard)
  updateItemStatus(
    @UserNo() userNo: number,
    @Param("itemNo", ParsePositiveIntPipe) itemNo: number,
    @Body() body: UpdateUserItemStatusDto,
  ) {
    return this.inventoryService.updateItemStatus(userNo, itemNo, body);
  }
}
