import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { UserNo } from "src/auth/auth.decorator";
import { RockScissorsPaperService } from "./rock-scissors-paper/rock-scissors-paper.service";
import { RockScissorsPaperDto } from "./rock-scissors-paper/dtos/rock-scissors-paper.dto";
import { AccessTokenAuthGuard } from "src/auth/jwt/jwt.guard";
import { ApiCreateRSPRecord } from "./swagger-decorators/create-RSP-record.decorator";
import { ApiTags } from "@nestjs/swagger";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { ApiGetRSPRecords } from "./swagger-decorators/get-RSP-records.decorator";
import { ParsePositiveIntPipe } from "src/common/pipes/parse-positive-int.pipe";

@Controller("users")
@ApiTags("Games")
export class GamesController {
  constructor(
    private readonly rockScissorsPaperService: RockScissorsPaperService,
  ) {}

  @Post("my/rock-scissors-paper")
  @UseGuards(AccessTokenAuthGuard)
  @ApiCreateRSPRecord()
  createRSPRecord(
    @UserNo() userNo: number,
    @Body() body: RockScissorsPaperDto,
  ) {
    return this.rockScissorsPaperService.createRSPRecord(userNo, body);
  }

  @Get("/:userNo/rock-scissors-paper")
  @UseGuards(AccessTokenAuthGuard)
  @ApiGetRSPRecords()
  getRSPRecords(
    @Param("userNo", ParsePositiveIntPipe) userNo: number,
    @Query() query: PaginationDto,
  ) {
    return this.rockScissorsPaperService.getRSPRecords(userNo, query);
  }
}
