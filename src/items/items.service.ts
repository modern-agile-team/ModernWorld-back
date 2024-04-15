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
}
