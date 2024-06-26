import { PartialType } from '@nestjs/swagger';
import { CreateNeighborDto } from './create-neighbor.dto';

export class UpdateNeighborDto extends PartialType(CreateNeighborDto) {}
