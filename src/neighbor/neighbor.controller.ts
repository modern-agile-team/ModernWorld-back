import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { NeighborService } from "./neighbor.service";
import { CreateNeighborDto } from "./dto/create-neighbor.dto";
import { UpdateNeighborDto } from "./dto/update-neighbor.dto";

@Controller("neighbor")
export class NeighborController {
  constructor(private readonly neighborService: NeighborService) {}

  @Post()
  neighborRequest(@Body() body: CreateNeighborDto) {
    const userNo = 1;
    return this.neighborService.neighborRequest(body, userNo);
  }
}
