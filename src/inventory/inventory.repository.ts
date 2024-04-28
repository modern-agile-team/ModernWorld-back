import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class InventoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  checkInventoryItem(userNo: number, itemNo: number) {
    return this.prisma.inventory.findFirst({
      where: { userNo, itemNo },
    });
  }

  addItemToInventory(userNo: number, itemNo: number) {
    return this.prisma.inventory.create({
      data: {
        userNo,
        itemNo,
      },
    });
  }
}
