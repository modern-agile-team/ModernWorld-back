import { Injectable } from "@nestjs/common";
import { PrismaPromise, legend } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class LegendsRepository {
  constructor(private readonly prisma: PrismaService) {}

  updateUserLikeCount(userNo: number, count: number): PrismaPromise<legend> {
    return this.prisma.legend.update({
      data: { likeCount: { increment: count } },
      where: { userNo },
    });
  }
}
