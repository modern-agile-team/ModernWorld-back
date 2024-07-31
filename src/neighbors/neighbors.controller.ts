import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { NeighborsService } from "./neighbors.service";
import { ApiTags } from "@nestjs/swagger";
import { ApiCraeteNeighbor } from "./swagger-decorators/create-one-neighbors.decorator";
import { ApiGetNeighbor } from "./swagger-decorators/get-neighbors.decorator";
import { ApiUpdateNeighbor } from "./swagger-decorators/update-one-neighbor.decorator";
import { ApiDeleteNeighbor } from "./swagger-decorators/delete-one-neighbor.decorator";
import { ParsePositiveIntPipe } from "src/common/pipes/parse-positive-int.pipe";
import { NeighborsPaginationDto } from "./dtos/neighbors-pagination.dto";
import { AccessTokenAuthGuard } from "src/auth/jwt/jwt.guard";
import { UserNo } from "src/auth/auth.decorator";

@Controller()
@ApiTags("neighbors")
export class NeighborsController {
  constructor(private readonly neighborsService: NeighborsService) {}

  @Post("users/:userNo/neighbors")
  @ApiCraeteNeighbor()
  @UseGuards(AccessTokenAuthGuard)
  createNeighbor(
    @UserNo() senderNo: number,
    @Param("userNo", ParsePositiveIntPipe) userNo: number,
  ) {
    return this.neighborsService.createNeighbor(senderNo, userNo);
  }

  @Get("users/my/neighbors")
  @ApiGetNeighbor()
  @UseGuards(AccessTokenAuthGuard)
  getMyNeighbors(
    @UserNo() userNo: number,
    @Query() query: NeighborsPaginationDto,
  ) {
    return this.neighborsService.getMyNeighbors(userNo, query);
  }

  @Patch("users/my/neighbors/:neighborNo")
  @ApiUpdateNeighbor()
  @UseGuards(AccessTokenAuthGuard)
  updateNeighbor(
    @UserNo() userNo: number,
    @Param("neighborNo", ParsePositiveIntPipe) neighborNo: number,
  ) {
    return this.neighborsService.updateNeighbor(neighborNo, userNo);
  }

  @Delete("users/my/neighbors/:neighborNo")
  @ApiDeleteNeighbor()
  @HttpCode(204)
  @UseGuards(AccessTokenAuthGuard)
  deleteNeighbor(
    @UserNo() userNo: number,
    @Param("neighborNo", ParsePositiveIntPipe) neighborNo: number,
  ) {
    return this.neighborsService.deleteNeighbor(neighborNo, userNo);
  }
}
