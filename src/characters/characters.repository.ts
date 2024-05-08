import { Injectable } from "@nestjs/common";
import { character } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CharactersRepository {
  constructor(private readonly prisma: PrismaService) {}

  getOneCharacter(characterNo: number): Promise<character> {
    return this.prisma.character.findUnique({
      where: {
        no: characterNo,
      },
    });
  }

  getCharactersBySpecies(species?: string): Promise<character[]> {
    console.log(species);
    return this.prisma.character.findMany({ where: { species } });
  }
}
