import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CharactersRepository {
  constructor(private readonly prisma: PrismaService) {}

  getChraractersBySpecies(species: string) {
    return this.prisma.character.findMany({ where: { species } });
  }
}
