import {
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { InventoryService } from "./inventory.service";
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { GetUserAllCharacteresDto } from "./dtos/get-user-all-characters.dto";

@Controller("inventory")
@ApiTags("Inventory")
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get("users/:userNo")
  @ApiOperation({
    summary: "아이템 조회 API",
    description: "유저 아이템 조회 API",
  })
  @ApiParam({ name: "userNo", type: Number, required: true, example: 1 })
  getUserAllItems(
    @Param("userNo", ParseIntPipe) userNo: number,
    @Query() queryParam: GetUserAllCharacteresDto,
  ) {
    console.log(queryParam);
    return this.inventoryService.getUserAllItems(userNo, queryParam);
  }

  @Post(":itemNo")
  @ApiOperation({
    summary: "아이템 구매 API",
    description: "아이템을 구매하여 inventory테이블에 등록합니다.",
  })
  buyItem(@Param("itemNo", ParseIntPipe) itemNo: number) {
    const userNo = 1;

    return this.inventoryService.buyOneItem(userNo, itemNo);
  }

  @Patch(":itemNo")
  @ApiOperation({
    summary: "아이템 사용 API",
    description: "사용시 같은 타입의 다른 아이템은 사용해제 처리됩니다.",
  })
  useItem(@Param("itemNo", ParseIntPipe) itemNo: number) {
    const userNo = 1;

    return this.inventoryService.useItemDisuseOthers(userNo, itemNo);
  }
}
