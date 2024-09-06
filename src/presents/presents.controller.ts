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
  UseGuards,
} from "@nestjs/common";
import { PresentsService } from "./presents.service";
import { ApiTags } from "@nestjs/swagger";
import { PresentAcceptRejectDto } from "./dtos/present-accept-reject.dto";
import { ItemNoDto } from "./dtos/item-no.dto";
import { SenderReceiverNoDto } from "../common/dtos/sender-receiver-no.dto";
import { ApiCreateOnePresent } from "./presents-swagger/create-one-present.decorator";
import { ApiGetUserPresents } from "./presents-swagger/get-user-presents.decorator";
import { ApiGetUserOnePresent } from "./presents-swagger/get-user-one-present.decorator";
import { ApiUpdatePresentStatus } from "./presents-swagger/update-present-status.decorator";
import { ApiDeleteOnePresent } from "./presents-swagger/delete-one-present.decorator";
import { ParsePositiveIntPipe } from "src/common/pipes/parse-positive-int.pipe";
import { AccessTokenAuthGuard } from "src/auth/jwt/jwt.guard";
import { UserNo } from "src/auth/auth.decorator";
import { PresentsWithoutDeleteResponseDto } from "./dtos/presents-without-delete-response.dto";
import { GetUserOnePresentResponseDto } from "./dtos/get-user-one-present-response.dto";

@Controller()
@ApiTags("Presents")
export class PresentsController {
  constructor(private readonly presentsService: PresentsService) {}

  @Get("users/my/presents")
  @ApiGetUserPresents()
  @UseGuards(AccessTokenAuthGuard)
  getUserPresents(
    @UserNo() userNo: number,
    @Query()
    query: SenderReceiverNoDto,
  ) {
    return this.presentsService.getUserPresents(userNo, query);
  }

  @Get("users/my/presents/:presentNo")
  @ApiGetUserOnePresent()
  @UseGuards(AccessTokenAuthGuard)
  async getUserOnePresent(
    @UserNo() userNo: number,
    @Param("presentNo", ParsePositiveIntPipe) presentNo: number,
  ) {
    return new GetUserOnePresentResponseDto(
      await this.presentsService.getUserOnePresent(userNo, presentNo),
    );
  }

  @Post("users/:userNo/presents")
  @ApiCreateOnePresent()
  @UseGuards(AccessTokenAuthGuard)
  async createOnePresent(
    @UserNo() userNo: number,
    @Param("userNo", ParsePositiveIntPipe) receiverNo: number,
    @Body() body: ItemNoDto,
  ) {
    return new PresentsWithoutDeleteResponseDto(
      await this.presentsService.createOnePresent(userNo, receiverNo, body),
    );
  }

  @Patch("users/my/presents/:presentNo")
  @ApiUpdatePresentStatus()
  @UseGuards(AccessTokenAuthGuard)
  async updatePresentStatus(
    @UserNo() userNo: number,
    @Param("presentNo", ParsePositiveIntPipe) presentNo: number,
    @Body()
    body: PresentAcceptRejectDto,
  ) {
    return new PresentsWithoutDeleteResponseDto(
      await this.presentsService.acceptOrRejectOnePresent(
        userNo,
        presentNo,
        body,
      ),
    );
  }

  @Delete("users/my/presents/:presentNo")
  @ApiDeleteOnePresent()
  @HttpCode(204)
  @UseGuards(AccessTokenAuthGuard)
  deleteOnePresent(
    @UserNo() userNo: number,
    @Param("presentNo", ParsePositiveIntPipe) presentNo: number,
  ) {
    return this.presentsService.updateOnePresentToDelete(userNo, presentNo);
  }
}
