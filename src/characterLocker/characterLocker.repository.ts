import { Injectable } from "@nestjs/common";
import { PrismaPromise, characterLocker } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CharacterLockerRepository {
  constructor(private readonly prisma: PrismaService) {}

  addOneCharacter(
    userNo: number,
    characterNo: number,
  ): PrismaPromise<characterLocker> {
    return this.prisma.characterLocker.create({
      data: { characterNo, userNo },
    });
  }

  updateCharacterStatus(
    userNo: number,
    characterNo: number,
  ): PrismaPromise<{ count: number }> {
    return this.prisma.characterLocker.updateMany({
      data: { status: true },
      where: { userNo, characterNo },
    });
  }

  disuseOtherCharacters(
    userNo: number,
    characterNo: number,
  ): PrismaPromise<{ count: number }> {
    return this.prisma.characterLocker.updateMany({
      data: { status: false },
      where: { userNo, characterNo: { not: characterNo } },
    });
  }

  getUserAllCharactersBySpecies(
    userNo: number,
    species?: string,
  ): PrismaPromise<characterLocker[]> {
    return this.prisma.characterLocker.findMany({
      where: { userNo, character: { species } },
    });
  }

  findUserCharacterFromInventory(
    userNo: number,
    characterNo: number,
  ): PrismaPromise<{
    no: number;
    characterNo: number;
    userNo: number;
    status: boolean;
  }> {
    return this.prisma.characterLocker.findFirst({
      where: { userNo, characterNo },
    });
  }
}
