import { Injectable } from "@nestjs/common";
import { CreateNeighborDto } from "./dto/create-neighbor.dto";
import { UpdateNeighborDto } from "./dto/update-neighbor.dto";
import { NeighborRepository } from "./neighbor.repository";

@Injectable()
export class NeighborService {
  constructor(private readonly neighborRepository: NeighborRepository) {}
}
