import {
  Body,
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
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { SenderReceiverNoField } from "./enum/present-senderReceiverNo.enum";
import { PresentAcceptRejectDto } from "./dtos/present-accept-reject.dto";
import { CreatePresentDto } from "./dtos/create-present.dto";

@Controller("presents")
@ApiTags("Presents")
export class PresentsController {
  constructor(private readonly presentsService: PresentsService) {}

  @Get()
  @ApiOperation({
    summary: "유저와 연관된 선물 가져오기 API (발신, 수신)",
  })
  @ApiQuery({
    name: "type",
    enum: SenderReceiverNoField,
    required: false,
    example: "senderNo",
  })
  getPresents(
    @Query("type", new ParseEnumPipe(SenderReceiverNoField, { optional: true }))
    senderReceiverNoField: SenderReceiverNoField,
  ) {
    const userNo = 1;

    return this.presentsService.getPresents(userNo, senderReceiverNoField);
  }

  @Get(":presentNo")
  @ApiOperation({ summary: "특정 선물 가져오기 API" })
  @ApiParam({
    name: "presentNo",
    example: 1,
  })
  getOnePresent(@Param("presentNo", ParseIntPipe) presentNo: number) {
    const userNo = 1;

    return this.presentsService.getOnePresent(userNo, presentNo);
  }

  @Post()
  @ApiOperation({ summary: "특정 선물 추가 API" })
  createOnePresent(@Body() body: CreatePresentDto) {
    const userNo = 1;

    return this.presentsService.createOnePresent(userNo, body);
  }

  @Patch(":presentNo")
  @ApiOperation({ summary: "특정 선물 수락/거절 API" })
  @ApiParam({
    name: "presentNo",
    example: 1,
  })
  updatePresentStatus(
    @Param("presentNo", ParseIntPipe) presentNo: number,
    @Body()
    body: PresentAcceptRejectDto,
  ) {
    const userNo = 1;

    return this.presentsService.acceptOrRejectOnePresent(
      userNo,
      presentNo,
      body,
    );
  }

  @Delete(":presentNo")
  @ApiOperation({ summary: "특정 선물 발신/수신 기준 제거 API" })
  @ApiParam({
    name: "presentNo",
    example: 1,
  })
  deleteOnePresent(@Param("presentNo", ParseIntPipe) presentNo: number) {
    const userNo = 1;

    return this.presentsService.updateOnePresentTodelete(userNo, presentNo);
  }
}
