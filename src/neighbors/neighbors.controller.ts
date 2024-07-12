import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { NeighborService } from "./neighbors.service";
import { CreateNeighborDto } from "./dtos/create-neighbor.dto";
import { UpdateNeighborDto } from "./dtos/update-neighbor.dto";
import { getNeighborDto } from "./dtos/get-neighbors.dto";
import { ApiTags } from "@nestjs/swagger";
import { ApiCraeteNeighbor } from "./swagger-decorators/create-neighbors.decorator";

@Controller("neighbors")
@ApiTags("Neighbors")
export class NeighborController {
  constructor(private readonly neighborService: NeighborService) {}

  @ApiCraeteNeighbor()
  @Post()
  neighborRequest(@Body() body: CreateNeighborDto) {
    const userNo = 8;
    return this.neighborService.neighborRequest(body, userNo);
  }

  @Get()
  getMYNeighbors(@Query() queryParams: getNeighborDto) {
    const userNo = 2;
    return this.neighborService.getMyNeighbors(userNo, queryParams);
  }

  @Patch()
  neighborApproval(@Body() body: UpdateNeighborDto) {
    return this.neighborService.neighborApproval(body);
  }

  @Delete(":neighborNo")
  neighborRequestRefusalOrDelete(@Param("neighborNo") neighborNo: number) {
    return this.neighborService.neighborRequestRefusalOrDelete(neighborNo);
  }
}
