import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}
  async showItems(theme: string) {
    const result = await this.prisma.item.findMany({
      where: { theme: theme },
    });

    return result;
  }

  async buyItem(userNo: number, ItemNo: number) {
    const item = await this.prisma.item.findFirstOrThrow({
      where: { no: ItemNo },
    });

    console.log(item);

    const pay = await this.prisma.user.update({
      where: { no: userNo },
      data: { currentPoint: { decrement: -10 } },
    });

    const result = await this.prisma.inventory.create({
      data: { userNo: userNo, itemNo: ItemNo },
    });

    return result;
  }
}
