import { Injectable } from "@nestjs/common";
import { inventory } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class InventoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  getUserAllItems(userNo: number, theme?: string): Promise<inventory[]> {
    return this.prisma.inventory.findMany({
      where: {
        userNo,
        item: { theme },
      },
    });
  }

  findOneItem(userNo: number, itemNo: number): Promise<inventory> {
    return this.prisma.inventory.findFirst({
      where: { userNo, itemNo },
    });
  }

  addOneItem(userNo: number, itemNo: number): Promise<inventory> {
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
      where: { userNo, status: true },
    });
  }

  updateItemStatus(userNo: number, itemNo: number) {
    return this.prisma.inventory.updateMany({
      data: {
        status: true,
      },
      where: { userNo, itemNo },
    });
  }

  disuseOtherItems(userNo: number, itemType: string) {
    return this.prisma.inventory.updateMany({
      data: { status: false },
      where: { userNo, item: { type: itemType } },
    });
  }
}
