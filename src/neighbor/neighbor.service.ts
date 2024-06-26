import { Injectable } from '@nestjs/common';
import { CreateNeighborDto } from './dto/create-neighbor.dto';
import { UpdateNeighborDto } from './dto/update-neighbor.dto';

@Injectable()
export class NeighborService {
  create(createNeighborDto: CreateNeighborDto) {
    return 'This action adds a new neighbor';
  }

  findAll() {
    return `This action returns all neighbor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} neighbor`;
  }

  update(id: number, updateNeighborDto: UpdateNeighborDto) {
    return `This action updates a #${id} neighbor`;
  }

  remove(id: number) {
    return `This action removes a #${id} neighbor`;
  }
}
