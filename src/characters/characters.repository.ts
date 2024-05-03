import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CharactersRepository {
  constructor(private readonly prisma: PrismaService) {}

  getOneCharacter(characterNo: number) {
    return this.prisma.character.findUnique({
      where: {
        no: characterNo,
      },
    });
  }

  getChraractersBySpecies(species: string) {
    return this.prisma.character.findMany({ where: { species } });
  }
}
