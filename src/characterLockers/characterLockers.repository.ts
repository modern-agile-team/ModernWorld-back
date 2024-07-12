import { Injectable } from "@nestjs/common";
import { PrismaPromise, characterLocker } from "@prisma/client";
import { Animal } from "src/common/enum/animal.enum";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CharacterLockersRepository {
  constructor(private readonly prisma: PrismaService) {}

  getUserAllCharacters(
    userNo: number,
    species?: Animal,
    status?: boolean,
  ): PrismaPromise<characterLocker[]> {
    return this.prisma.characterLocker.findMany({
      select: {
        no: true,
        characterNo: true,
        userNo: true,
        status: true,
        character: {
          select: {
            name: true,
            description: true,
            image: true,
            species: true,
            price: true,
          },
        },
      },
      where: { userNo, character: { species }, status },
    });
  }

  createOneCharacter(
    userNo: number,
    characterNo: number,
    status?: boolean,
  ): PrismaPromise<characterLocker> {
    return this.prisma.characterLocker.create({
      data: { characterNo, userNo, status },
    });
  }

  updateCharacterStatusToUse(no: number): PrismaPromise<characterLocker> {
    return this.prisma.characterLocker.update({
      data: { status: true },
      where: { no },
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
    species: string,
  ): PrismaPromise<characterLocker[]> {
    return this.prisma.characterLocker.findMany({
      where: { userNo, character: { species } },
    });
  }

  findUserCharacterFromInventory(
    userNo: number,
    characterNo: number,
  ): PrismaPromise<characterLocker> {
    return this.prisma.characterLocker.findFirst({
      where: { userNo, characterNo },
    });
  }
}