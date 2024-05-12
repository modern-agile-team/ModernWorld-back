import { Injectable } from "@nestjs/common";
import { PrismaPromise, character } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CharactersRepository {
  constructor(private readonly prisma: PrismaService) {}

  getOneCharacter(characterNo: number): PrismaPromise<character> {
    return this.prisma.character.findUnique({
      where: {
        no: characterNo,
      },
    });
  }

  getCharactersBySpeciesOrName(
    species?: string,
    characterName?: string,
  ): PrismaPromise<character[]> {
    return this.prisma.character.findMany({
      where: { species, name: { contains: characterName } },
    });
  }
}
