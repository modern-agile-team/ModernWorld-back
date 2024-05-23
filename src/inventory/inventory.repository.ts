import { Injectable } from "@nestjs/common";
import { PrismaPromise, inventory } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class InventoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  getUserItems(
    userNo: number,
    theme: string,
    status: boolean,
    itemName: string,
  ): PrismaPromise<inventory[]> {
    return this.prisma.inventory.findMany({
      select: {
        no: true,
        userNo: true,
        itemNo: true,
        createdAt: true,
        status: true,
        item: {
          select: {
            no: true,
            name: true,
            description: true,
            theme: true,
            type: true,
            price: true,
          },
        },
      },
      where: {
        userNo,
        item: { name: { contains: itemName }, theme },
        status,
      },
    });
  }

  findOneItem(userNo: number, itemNo: number): PrismaPromise<inventory> {
    return this.prisma.inventory.findFirst({
      where: { userNo, itemNo },
    });
  }

  addOneItem(userNo: number, itemNo: number): PrismaPromise<inventory> {
    return this.prisma.inventory.create({
      data: {
        userNo,
        itemNo,
      },
    });
  }

  updateItemStatus(
    userNo: number,
    itemNo: number,
    status: boolean,
  ): PrismaPromise<{ count: number }> {
    return this.prisma.inventory.updateMany({
      data: {
        status,
      },
      where: { userNo, itemNo },
    });
  }

  disuseOtherItems(
    userNo: number,
    itemType: string,
  ): PrismaPromise<{ count: number }> {
    return this.prisma.inventory.updateMany({
      data: { status: false },
      where: { userNo, item: { type: itemType } },
    });
  }
}
