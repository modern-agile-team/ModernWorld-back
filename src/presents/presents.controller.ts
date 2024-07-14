import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { PresentsService } from "./presents.service";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { PresentAcceptRejectDto } from "./dtos/present-accept-reject.dto";
import { ItemNoDto } from "./dtos/item-no.dto";
import { GetUserPresentsDto } from "./dtos/get-user-presents.dto";
import { ApiCreateOnePresent } from "./presents-swagger/create-one-present.decorator";
import { ApiGetUserPresents } from "./presents-swagger/get-user-presents.decorator";
import { ApiGetUserOnePresent } from "./presents-swagger/get-user-one-present.decorator";
import { ApiUpdatePresentStatus } from "./presents-swagger/update-present-status.decorator";
import { ApiDeleteOnePresent } from "./presents-swagger/delete-one-present.decorator";
import { ParsePositiveIntPipe } from "src/common/pipes/parse-positive-int.pipe";

@Controller()
@ApiTags("Presents")
export class PresentsController {
  constructor(private readonly presentsService: PresentsService) {}

  @Get("users/presents")
  @ApiGetUserPresents()
  getUserPresents(
    @Query()
    query: GetUserPresentsDto,
  ) {
    const userNo = 1;

    return this.presentsService.getUserPresents(userNo, query);
  }

  @Get("users/presents/:presentNo")
  @ApiGetUserOnePresent()
  getUserOnePresent(
    @Param("presentNo", ParsePositiveIntPipe) presentNo: number,
  ) {
    const userNo = 1;

    return this.presentsService.getUserOnePresent(userNo, presentNo);
  }

  @Post("users/:userNo/presents")
  @ApiCreateOnePresent()
  createOnePresent(
    @Param("userNo", ParsePositiveIntPipe) receiverNo: number,
    @Body() body: ItemNoDto,
  ) {
    const tokenUserNo = 1;

    return this.presentsService.createOnePresent(tokenUserNo, receiverNo, body);
  }

  @Patch("users/presents/:presentNo")
  @ApiUpdatePresentStatus()
  updatePresentStatus(
    @Param("presentNo", ParsePositiveIntPipe) presentNo: number,
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

  @Delete("users/presents/:presentNo")
  @ApiDeleteOnePresent()
  @HttpCode(204)
  deleteOnePresent(
    @Param("presentNo", ParsePositiveIntPipe) presentNo: number,
  ) {
    const userNo = 1;

    return this.presentsService.updateOnePresentTodelete(userNo, presentNo);
  }
}
