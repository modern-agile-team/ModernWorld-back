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
  ParseIntPipe,
} from "@nestjs/common";
import { NeighborsService } from "./neighbors.service";
import { CreateNeighborDto } from "./dtos/create-neighbor.dto";
import { UpdateNeighborDto } from "./dtos/update-neighbor.dto";

import { ApiTags } from "@nestjs/swagger";
import { ApiCraeteNeighbor } from "./swagger-decorators/create-neighbors.decorator";
import { ApiGetNeighobor } from "./swagger-decorators/get_neighbor.decorator";
import { ApiUpdateNeighobor } from "./swagger-decorators/update_neighbor.decorator";
import { ApiDeleteNeighobor } from "./swagger-decorators/delete-neighbor";
import { PaginationDto } from "src/common/dtos/pagination.dto";

@Controller()
@ApiTags("neighbors")
export class NeighborsController {
  constructor(private readonly neighborsService: NeighborsService) {}

  @ApiCraeteNeighbor()
  @Post("users/:userNo/neighbor")
  createNeighbor(@Param() userNo: number, @Body() body: CreateNeighborDto) {
    return this.neighborsService.createNeighbor(body, userNo);
  }

  @ApiGetNeighobor()
  @Get("neighbors")
  getMyNeighbors(@Query() queryParams: PaginationDto) {
    const userNo = 1;
    return this.neighborsService.getMyNeighbors(userNo, queryParams);
  }

  @ApiUpdateNeighobor()
  @Patch("users/by/neighbors/:neighborNo")
  updateNeighbor(
    @Param("neighborNo", ParseIntPipe) neighborNo: number,
    @Body()
    body: UpdateNeighborDto,
  ) {
    const userNo = 1;
    return this.neighborsService.updateNeighbor(neighborNo, userNo, body);
  }

  @ApiDeleteNeighobor()
  @Delete("users/my/neighbor/:neighborNo")
  @HttpCode(204)
  rejectNeighborRequestOrDeleteNeighbor(
    @Param("neighborNo") neighborNo: number,
  ) {
    const userNo = 1;
    return this.neighborsService.rejectNeighborRequestOrDeleteNeighbor(
      neighborNo,
      userNo,
    );
  }
}
