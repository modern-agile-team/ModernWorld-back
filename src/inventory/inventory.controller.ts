import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { InventoryService } from "./inventory.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("inventory")
@ApiTags("Inventory")
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

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

  //유저 방 조회
  @Get(":userNo/room")
  @ApiOperation({
    summary: "유저 방 불러오기 API",
    description: "유저의 아이템 중에서 활성화 중인 아이템을 가져옵니다.",
  })
  showUserRoom(@Param("userNo") userNo: number) {
    return this.inventoryService.getUsingitem(userNo);
  }
}
