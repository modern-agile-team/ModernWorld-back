import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ItemsRepository } from "./items.repository";
import { InventoryRepository } from "src/inventory/inventory.repository";
@Injectable()
export class ItemsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly itemsRepository: ItemsRepository,
    private readonly inventoryRepository: InventoryRepository,
  ) {}
  async showItems(theme: string) {
    /**
     * 반환할때 자기가 보유하고 있는지에 대한 여부도 표시해주면 좋을듯
     * 1. 해당 테마의 모든 아이템을 반환한다.
     *
     *
     *
     */
    const result = await this.itemsRepository.showItems(theme);

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
     * 3. 포인트가 아이템 가격보다 높은지 확인 (usersRepository)
     *
     * 4. 물건 추가 (inventoryRepository)
     *
     * 5. 포인트 감소 (usersRepository)
     *
     * 4번 5번의 과정은 트랜잭션을 한번에 묶자.
     */

    const item = await this.itemsRepository.findOneItem(itemNo);

    if (!item) {
      throw new NotFoundException("Item doesn't exist");
    }

    const checkInventoryItem =
      await this.inventoryRepository.checkInventoryItem(userNo, itemNo);

    if (!checkInventoryItem) {
      throw new ConflictException("User already owns the item.");
    }

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
