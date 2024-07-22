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
import { UpdateNeighborDto } from "./dtos/update-neighbor.dto";
import { ApiTags } from "@nestjs/swagger";
import { ApiCraeteNeighbor } from "./swagger-decorators/create-one-neighbors.decorator";
import { ApiGetNeighobor } from "./swagger-decorators/get-neighbor.decorator";
import { ApiUpdateNeighobor } from "./swagger-decorators/updat-one-neighbor.decorator";
import { ApiDeleteNeighobor } from "./swagger-decorators/delete-one-neighbor.decorator";
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

  @ApiGetNeighobor()
  @Get("neighbors")
  getMyNeighbors(@Query() query: NeighborsPaginationDto) {
    const userNo = 1;
    return this.neighborsService.getMyNeighbors(userNo, query);
  }

  //@Get("")
  @ApiUpdateNeighobor()
  @Patch("users/by/neighbors/:neighborNo")
  updateNeighbor(
    @Param("neighborNo", ParsePositiveIntPipe) neighborNo: number,
    @Body()
    body: UpdateNeighborDto,
  ) {
    const userNo = 3;
    return this.neighborsService.updateNeighbor(neighborNo, userNo, body);
  }

  @ApiDeleteNeighobor()
  @Delete("users/my/neighbor/:neighborNo")
  @HttpCode(204)
  rejectNeighborRequestOrDeleteNeighbor(
    @Param("neighborNo", ParsePositiveIntPipe) neighborNo: number,
  ) {
    const userNo = 1;
    return this.neighborsService.rejectNeighborRequestOrDeleteNeighbor(
      neighborNo,
      userNo,
    );
  }
}
