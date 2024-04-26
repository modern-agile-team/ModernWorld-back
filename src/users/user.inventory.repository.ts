import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersInventoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  getUserRoom(userNo: number) {
    return this.prisma.inventory.findMany({
      select: {
        status: true,
        item: { select: { name: true, image: true } },
      },
      where: { userNo: userNo, status: true },
    });
  }
}
