import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CharacterLockerRepository {
  constructor(private readonly prisma: PrismaService) {}

  addOneCharacter(userNo: number, characterNo: number) {
    return this.prisma.characterLocker.create({
      data: { characterNo, userNo },
    });
  }

  updateStatus(userNo: number, characterNo: number) {
    return this.prisma.characterLocker.updateMany({
      data: { status: true },
      where: { userNo, characterNo },
    });
  }

  disuseOtherCharacters(userNo: number, characterNo: number) {
    return this.prisma.characterLocker.updateMany({
      data: { status: false },
      where: { userNo, characterNo: { not: characterNo } },
    });
  }

  getUserAllCharactersBySpecies(userNo: number, species: string) {
    return this.prisma.characterLocker.findMany({
      where: { userNo, character: { species } },
    });
  }

  findOneCharacterFromInventory(userNo: number, characterNo: number) {
    return this.prisma.characterLocker.findFirst({
      where: { userNo, characterNo },
    });
  }
}
