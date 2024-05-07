import { Injectable } from "@nestjs/common";
import { item } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ItemsRepository {
  constructor(private readonly prisma: PrismaService) {}

  getOneItem(itemNo: number): Promise<item> {
    return this.prisma.item.findUnique({
      where: {
        no: itemNo,
      },
    });
  }

  getAllItems(theme?: string): Promise<item[]> {
    return this.prisma.item.findMany({ where: { theme } });
  }

  getItemType(itemNo: number): Promise<Pick<item, "type">> {
    return this.prisma.item.findUnique({
      select: { type: true },
      where: { no: itemNo },
    });
  }
}
