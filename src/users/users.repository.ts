import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  modifyUserPoint(userNo: number, point: number) {
    return this.prisma.user.update({
      where: { no: userNo },
      data: { currentPoint: { decrement: point } },
    });
  }

  findUserPoint(userNo: number) {
    return this.prisma.user.findFirst({
      where: { no: userNo },
      select: { nickname: true, currentPoint: true },
    });
  }
}
