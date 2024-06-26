import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NeighborService } from './neighbor.service';
import { CreateNeighborDto } from './dto/create-neighbor.dto';
import { UpdateNeighborDto } from './dto/update-neighbor.dto';

@Controller('neighbor')
export class NeighborController {
  constructor(private readonly neighborService: NeighborService) {}

  @Post()
  create(@Body() createNeighborDto: CreateNeighborDto) {
    return this.neighborService.create(createNeighborDto);
  }

  @Get()
  findAll() {
    return this.neighborService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.neighborService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNeighborDto: UpdateNeighborDto) {
    return this.neighborService.update(+id, updateNeighborDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.neighborService.remove(+id);
  }
}
