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

  useOneCharacter(userNo: number, characterNo: number) {
    return this.prisma.characterLocker.updateMany({
      data: { status: true },
      where: { userNo, characterNo },
    });
  }

  unUseOtherCharacters(userNo: number, characterNo: number) {
    return this.prisma.characterLocker.updateMany({
      data: { status: false },
      where: { userNo, characterNo: { not: characterNo } },
    });
  }

  getUserAllCharacters(userNo: number) {
    return this.prisma.characterLocker.findMany({
      where: { userNo },
    });
  }

  findOneCharacterFromInventory(userNo: number, characterNo: number) {
    return this.prisma.characterLocker.findFirst({
      where: { userNo, characterNo },
    });
  }
}
