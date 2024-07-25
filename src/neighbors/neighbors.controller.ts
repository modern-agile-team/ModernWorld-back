import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { NeighborsService } from "./neighbors.service";
import { UpdateNeighborDto } from "./dtos/update-neighbor.dto";
import { ApiTags } from "@nestjs/swagger";
import { ApiCraeteNeighbor } from "./swagger-decorators/create-one-neighbors.decorator";
import { ApiGetNeighbor } from "./swagger-decorators/get-neighbors.decorator";
import { ApiUpdateNeighbor } from "./swagger-decorators/update-one-neighbor.decorator";
import { ApiDeleteNeighbor } from "./swagger-decorators/delete-one-neighbor.decorator";
import { ParsePositiveIntPipe } from "src/common/pipes/parse-positive-int.pipe";
import { NeighborsPaginationDto } from "./dtos/neighbors-pagination.dto";
import { AccessTokenAuthGuard } from "src/auth/jwt/jwt.guard";
import { userNo } from "src/auth/auth.decorator";

@Controller()
@ApiTags("neighbors")
export class NeighborsController {
  constructor(private readonly neighborsService: NeighborsService) {}

  @ApiCraeteNeighbor()
  @Post("users/:userNo/neighbor")
  @UseGuards(AccessTokenAuthGuard)
  createNeighbor(
    @userNo() senderNo: number,
    @Param("userNo", ParsePositiveIntPipe) userNo: number,
  ) {
    return this.neighborsService.createNeighbor(senderNo, userNo);
  }

  @ApiGetNeighbor()
  @Get("users/my/neighbors")
  @UseGuards(AccessTokenAuthGuard)
  getMyNeighbors(
    @userNo() userNo: number,
    @Query() query: NeighborsPaginationDto,
  ) {
    return this.neighborsService.getMyNeighbors(userNo, query);
  }

  @ApiUpdateNeighbor()
  @Patch("users/by/neighbors/:neighborNo")
  @UseGuards(AccessTokenAuthGuard)
  updateNeighbor(
    @userNo() userNo: number,
    @Param("neighborNo", ParsePositiveIntPipe) neighborNo: number,
    @Body()
    body: UpdateNeighborDto,
  ) {
    return this.neighborsService.updateNeighbor(neighborNo, userNo, body);
  }

  @ApiDeleteNeighbor()
  @Delete("users/my/neighbors/:neighborNo")
  @HttpCode(204)
  @UseGuards(AccessTokenAuthGuard)
  deleteNeighborRelationAndRequest(
    @userNo() userNo: number,
    @Param("neighborNo", ParsePositiveIntPipe) neighborNo: number,
  ) {
    return this.neighborsService.deleteNeighborRelationAndRequest(
      neighborNo,
      userNo,
    );
  }
}
