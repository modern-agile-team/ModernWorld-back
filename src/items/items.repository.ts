import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ItemsRepository {
  constructor(private readonly prisma: PrismaService) {}

  getOneItem(itemNo: number) {
    return this.prisma.item.findUnique({
      where: {
        no: itemNo,
      },
    });
  }

  getAllItemsByTheme(theme: string) {
    return this.prisma.item.findMany({ where: { theme } });
  }

  getItemType(itemNo: number) {
    return this.prisma.item.findUnique({
      select: { type: true },
      where: { no: itemNo },
    });
  }
}
