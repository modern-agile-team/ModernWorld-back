import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaTxType } from "src/prisma/prisma.type";

@Injectable()
export class ItemsRepository {
  constructor(private readonly prisma: PrismaService) {}

  getOneItem(itemNo: number, tx?: PrismaTxType) {
    return (tx ?? this.prisma).item.findUnique({
      where: {
        no: itemNo,
      },
    });
  }

  getItems(theme: string, itemName: string) {
    return this.prisma.item.findMany({
      where: { theme, name: { contains: itemName } },
    });
  }

  getItemType(itemNo: number) {
    return this.prisma.item.findUnique({
      select: { type: true },
      where: { no: itemNo },
    });
  }
}
