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
    /**
     * 자기가 보유하고 있는것도 표시해주면 좋을듯
     *
     */
    const result = await this.itmesRepository.showItems(theme);

    return result;
  }

  async buyItem(userNo: number, itemNo: number) {
    /**
     * 아이템을 사는 로직
     *
     * 1. 그 아이템이 실제로 아이템 테이블에 존재하는 지 확인 (itemsRepository)
     *
     * 2. 아이템을 이미 보유하고있는지 확인하는 로직 추가 있다면 구매불가 (inventoryRepository)
     *
     * 3. 포인트가 부족하면 구매불가 (usersRepository)
     *
     * 4. 물건 추가 (inventoryRepository)
     *
     */
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
