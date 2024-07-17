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
import { getNeighborDto } from "./dtos/get-neighbors.dto";
import { ApiTags } from "@nestjs/swagger";
import { ApiCraeteNeighbor } from "./swagger-decorators/create-neighbors.decorator";
import { ApiGetNeighobor } from "./swagger-decorators/get_neighbor.decorator";
import { ApiUpdateNeighobor } from "./swagger-decorators/update_neighbor.decorator";
import { ApiDeleteNeighobor } from "./swagger-decorators/delete-neighbor";

@Controller("neighbors")
@ApiTags("neighbors")
export class NeighborsController {
  constructor(private readonly neighborsService: NeighborsService) {}

  @ApiCraeteNeighbor()
  @Post()
  neighborRequest(@Body() body: CreateNeighborDto) {
    const userNo = 1;
    return this.neighborsService.neighborRequest(body, userNo);
  }

  @ApiGetNeighobor()
  @Get()
  getMYNeighbors(@Query() queryParams: getNeighborDto) {
    const userNo = 1;
    return this.neighborsService.getMyNeighbors(userNo, queryParams);
  }

  @ApiUpdateNeighobor()
  @Patch(":neighborNo")
  neighborApproval(
    @Param("neighborNo", ParseIntPipe) neighborNo: number,
    @Body()
    body: UpdateNeighborDto,
  ) {
    const userNo = 1;
    return this.neighborsService.neighborApproval(neighborNo, userNo, body);
  }

  @ApiDeleteNeighobor()
  @Delete(":neighborNo")
  @HttpCode(204)
  neighborRequestRefusalOrDelete(@Param("neighborNo") neighborNo: number) {
    const userNo = 1;
    return this.neighborsService.neighborRequestRefusalOrDelete(
      neighborNo,
      userNo,
    );
  }
}
