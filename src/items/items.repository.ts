import { PrismaService } from "src/prisma/prisma.service";

export class ItemsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findOneItem(itemNo: number) {
    return this.prisma.item.findFirst({
      where: {
        no: itemNo,
      },
    });
  }

  showItems(theme: string) {
    return this.prisma.item.findMany({ where: { theme: theme } });
  }
}
