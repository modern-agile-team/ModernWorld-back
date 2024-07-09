import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { NeighborService } from "./neighbors.service";
import { CreateNeighborDto } from "./dtos/create-neighbor.dto";
import { UpdateNeighborDto } from "./dtos/update-neighbor.dto";

@Controller("neighbors")
export class NeighborController {
  constructor(private readonly neighborService: NeighborService) {}

  @Post()
  neighborRequest(@Body() body: CreateNeighborDto) {
    const userNo = 1;
    return this.neighborService.neighborRequest(body, userNo);
  }

  // @Get()
  // getManyNeighbor()

  @Patch()
  neighborApproval(@Body() body: UpdateNeighborDto) {
    return this.neighborService.neighborApproval(body);
  }
}
