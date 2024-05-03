import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class InventoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  getUserAllItemsByTheme(userNo: number, theme: string) {
    return this.prisma.inventory.findMany({
      where: {
        userNo,
        item: { theme },
      },
    });
  }

  checkInventoryItem(userNo: number, itemNo: number) {
    return this.prisma.inventory.findFirst({
      where: { userNo, itemNo },
    });
  }

  addOneItem(userNo: number, itemNo: number) {
    return this.prisma.inventory.create({
      data: {
        userNo,
        itemNo,
      },
    });
  }

  getUserRoom(userNo: number) {
    return this.prisma.inventory.findMany({
      select: {
        status: true,
        item: { select: { name: true, image: true, type: true } },
      },
      where: { userNo: userNo, status: true },
    });
  }

  useItem(userNo: number, itemNo: number) {
    return this.prisma.inventory.updateMany({
      data: {
        status: true,
      },
      where: { userNo, itemNo },
    });
  }

  discardItem(userNo: number, itemType: string) {
    return this.prisma.inventory.updateMany({
      data: { status: false },
      where: { userNo, item: { type: itemType } },
    });
  }
}
