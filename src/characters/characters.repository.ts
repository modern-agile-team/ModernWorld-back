import { Injectable } from "@nestjs/common";
import { Animal } from "src/common/enum/animal.enum";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CharactersRepository {
  constructor(private readonly prisma: PrismaService) {}

  getOneCharacter(no: number) {
    return this.prisma.character.findUnique({
      where: {
        no,
      },
    });
  }

  getCharactersBySpeciesOrName(species: Animal, characterName: string) {
    return this.prisma.character.findMany({
      where: { species, name: { contains: characterName } },
    });
  }
}
