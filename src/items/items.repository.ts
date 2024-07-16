import { Injectable } from "@nestjs/common";
import { PrismaPromise, item } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ItemsRepository {
  constructor(private readonly prisma: PrismaService) {}

  getOneItem(itemNo: number): PrismaPromise<item> {
    return this.prisma.item.findUnique({
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

  getItemType(itemNo: number): PrismaPromise<Pick<item, "type">> {
    return this.prisma.item.findUnique({
      select: { type: true },
      where: { no: itemNo },
    });
  }
}
