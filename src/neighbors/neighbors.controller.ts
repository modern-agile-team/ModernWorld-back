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

@Controller()
@ApiTags("neighbors")
export class NeighborsController {
  constructor(private readonly neighborsService: NeighborsService) {}

  @ApiCraeteNeighbor()
  @Post("users/:userNo/neighbor")
  createNeighbor(@Param("userNo", ParsePositiveIntPipe) userNo: number) {
    const senderNo = 1;
    return this.neighborsService.createNeighbor(senderNo, userNo);
  }

  @ApiGetNeighbor()
  @Get("users/my/neighbors")
  getMyNeighbors(@Query() query: NeighborsPaginationDto) {
    const userNo = 1;
    console.log(query);
    return this.neighborsService.getMyNeighbors(userNo, query);
  }

  @ApiUpdateNeighbor()
  @Patch("users/by/neighbors/:neighborNo")
  updateNeighbor(
    @Param("neighborNo", ParsePositiveIntPipe) neighborNo: number,
    @Body()
    body: UpdateNeighborDto,
  ) {
    const userNo = 1;
    return this.neighborsService.updateNeighbor(neighborNo, userNo, body);
  }

  @ApiDeleteNeighbor()
  @Delete("users/my/neighbors/:neighborNo")
  @HttpCode(204)
  DeleteNeighborRequestOrNeighbor(
    @Param("neighborNo", ParsePositiveIntPipe) neighborNo: number,
  ) {
    const userNo = 1;
    return this.neighborsService.DeleteNeighborRequestOrNeighbor(
      neighborNo,
      userNo,
    );
  }
}
