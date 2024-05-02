import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CharacterLockerRepository {
  constructor(private readonly prisma: PrismaService) {}

  addOneCharacter(characterNo: number, userNo: number) {
    return this.prisma.characterLocker.create({
      data: { characterNo, userNo },
    });
  }

  useOneCharacter(characterNo: number, userNo: number) {
    return this.prisma.characterLocker.updateMany({
      data: { status: true },
      where: { userNo, characterNo },
    });
  }

  unUseOtherCharacters(characterNo: number, userNo: number) {
    return this.prisma.characterLocker.updateMany({
      data: { status: false },
      where: { userNo, NOT: { characterNo } },
    });
  }

  getUserAllCharacters(userNo: number) {
    return this.prisma.characterLocker.findMany({
      where: { userNo },
    });
  }
}
