import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { InventoryService } from "./inventory.service";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { GetUserItemsDto } from "./dtos/get-user-items.dto";
import { UpdateUserItemStatusDto } from "./dtos/update-user-item-status.dto";

@Controller("inventory")
@ApiTags("Inventory")
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get("users/:userNo")
  @ApiOperation({
    summary: "유저의 인벤토리 조회 API",
    description: "유저의 인벤토리를 조회합니다.",
  })
  @ApiParam({ name: "userNo", example: 1 })
  getUserItems(
    @Param("userNo", ParseIntPipe) userNo: number,
    @Query() queryParams: GetUserItemsDto,
  ) {
    return this.inventoryService.getUserItems(userNo, queryParams);
  }

  @Post(":itemNo")
  @HttpCode(204)
  @ApiOperation({
    summary: "아이템 구매 API",
    description: "아이템을 구매하여 inventory테이블에 등록합니다.",
  })
  buyOneItem(@Param("itemNo", ParseIntPipe) itemNo: number) {
    const userNo = 1;

    return this.inventoryService.buyOneItem(userNo, itemNo);
  }

  @Patch(":itemNo")
  @ApiOperation({
    summary: "아이템 사용 / 사용안함 API",
    description:
      "사용시 같은 타입의 다른 아이템은 자동으로 사용해제 처리됩니다.",
  })
  updateItemStatus(
    @Param("itemNo", ParseIntPipe) itemNo: number,
    @Body() body: UpdateUserItemStatusDto,
  ) {
    const userNo = 1;

    return this.inventoryService.updateItemStatus(userNo, itemNo, body);
  }
}
