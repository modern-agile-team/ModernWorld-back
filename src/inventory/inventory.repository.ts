import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaTxType } from "src/prisma/prisma.type";

@Injectable()
export class InventoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  getUserItems(
    userNo: number,
    theme: string,
    status: boolean,
    itemName: string,
  ) {
    return this.prisma.inventory.findMany({
      select: {
        no: true,
        userNo: true,
        createdAt: true,
        status: true,
        item: {
          select: {
            no: true,
            name: true,
            description: true,
            image: true,
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

  findOneItem(userNo: number, itemNo: number) {
    return this.prisma.inventory.findFirst({
      where: { userNo, itemNo },
    });
  }

  createUserOneItem(userNo: number, itemNo: number, tx?: PrismaTxType) {
    return (tx ?? this.prisma).inventory.create({
      data: {
        userNo,
        itemNo,
      },
    });
  }

  updateItemStatus(no: number, status: boolean) {
    return this.prisma.inventory.update({
      data: {
        status,
      },
      where: { no },
    });
  }

  disuseOtherItems(userNo: number, itemType: string) {
    return this.prisma.inventory.updateMany({
      data: { status: false },
      where: { userNo, item: { type: itemType } },
    });
  }
}
