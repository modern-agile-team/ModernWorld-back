import {
  Controller,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { PresentsService } from "./presents.service";
import { AcceptReject } from "./enum/present-status-enum";
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { SenderReceiverNoField } from "./enum/present-senderReceiverNo-enum";

@Controller("presents")
@ApiTags("Presents")
export class PresentsController {
  constructor(private readonly presentsService: PresentsService) {}

  @Get("all")
  @ApiOperation({
    summary: "유저와 연관된 선물 가져오기 API (발신, 수신)",
  })
  @ApiQuery({
    name: "type",
    enum: SenderReceiverNoField,
    required: true,
    example: "senderNo",
  })
  getPresents(
    @Query("type", new ParseEnumPipe(SenderReceiverNoField))
    senderReceiverNoField: SenderReceiverNoField,
  ) {
    console.log(`Get /presents/${senderReceiverNoField}`);

    const userNo = 1;

    return this.presentsService.getPresents(userNo, senderReceiverNoField);
  }

  @Get(":presentNo")
  @ApiOperation({ summary: "특정 선물 가져오기 API" })
  @ApiParam({
    name: "presentNo",
    type: Number,
    required: true,
    example: 1,
  })
  getOnePresent(@Param("presentNo", ParseIntPipe) presentNo: number) {
    console.log(`Get /presents/:${presentNo}`);
    const userNo = 1;

    return this.presentsService.getOnePresent(userNo, presentNo);
  }

  @Post(":itemNo/user/:userNo")
  @ApiOperation({ summary: "특정 선물 추가 API" })
  @ApiParam({
    name: "itemNo",
    type: Number,
    required: true,
    example: 1,
  })
  @ApiParam({
    name: "userNo",
    type: Number,
    required: true,
    example: 1,
  })
  presentOneItem(
    @Param("itemNo", ParseIntPipe) itemNo: number,
    @Param("userNo", ParseIntPipe) receiverNo: number,
  ) {
    console.log(`Post /presents/:${itemNo}/users/:${receiverNo}`);

    const userNo = 1;

    return this.presentsService.createOnePresent(userNo, itemNo, receiverNo);
  }

  @Patch(":presentNo")
  @ApiOperation({ summary: "특정 선물 수락/거절 API" })
  @ApiParam({
    name: "presentNo",
    type: Number,
    required: true,
    example: 1,
  })
  @ApiQuery({
    name: "acceptReject",
    enum: AcceptReject,
    required: true,
    example: "accept",
  })
  updatePresentStatus(
    @Param("presentNo", ParseIntPipe) presentNo: number,
    @Query("acceptReject", new ParseEnumPipe(AcceptReject))
    acceptReject: AcceptReject,
  ) {
    console.log(`Patch /presents/:${presentNo}`);

    const userNo = 1;

    return this.presentsService.acceptOrRejectOnePresent(
      userNo,
      presentNo,
      acceptReject,
    );
  }

  @Delete(":presentNo")
  @ApiOperation({ summary: "특정 선물 발신/수신 기준 제거 API" })
  @ApiParam({
    name: "presentNo",
    type: Number,
    required: true,
    example: 1,
  })
  deleteOnePresent(@Param("presentNo", ParseIntPipe) presentNo: number) {
    console.log(`Delete /presents/:${presentNo}`);

    const userNo = 1;

    return this.presentsService.updateOnePresentTodelete(userNo, presentNo);
  }
}
