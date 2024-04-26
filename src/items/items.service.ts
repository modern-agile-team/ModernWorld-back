import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ItemsRepository } from "./items.repository";
@Injectable()
export class ItemsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly itmesRepository: ItemsRepository,
  ) {}
  async showItems(theme: string) {
    const result = await this.itmesRepository.showItems(theme);

    return result;
  }

  async buyItem(userNo: number, itemNo: number) {
    const item = await this.itmesRepository.findOneItem(itemNo);

    console.log(item);

    const pay = await this.prisma.user.update({
      where: { no: userNo },
      data: { currentPoint: { decrement: -10 } },
    });

    const result = await this.prisma.inventory.create({
      data: { userNo: userNo, itemNo: itemNo },
    });

    return result;
  }
}
