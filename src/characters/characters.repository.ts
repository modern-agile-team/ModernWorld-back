import { Injectable } from "@nestjs/common";
import { PrismaPromise, character } from "@prisma/client";
import { Animal } from "src/common/enum/animal-enum";
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
    species: Animal,
    characterName: string,
  ): PrismaPromise<Pick<character, "no" | "image" | "name">[]> {
    return this.prisma.character.findMany({
      select: { no: true, image: true, name: true },
      where: { species, name: { contains: characterName } },
    });
  }
}
