import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ItemsRepository } from "./items.repository";
import { InventoryRepository } from "src/inventory/inventory.repository";
import { UserRepository } from "src/users/users.repository";
@Injectable()
export class ItemsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly itemsRepository: ItemsRepository,
    private readonly inventoryRepository: InventoryRepository,
    private readonly usersRepository: UserRepository,
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
     * 1. 그 아이템이 실제로 아이템 테이블에 존재하는 지 확인 (itemsRepository)ㅇ
     *
     * 2. 아이템을 이미 보유하고있는지 확인하는 로직 추가 있다면 구매불가 (inventoryRepository)ㅇ
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

    if (checkInventoryItem) {
      throw new ConflictException("User already owns the item.");
    }

    const { nickname, currentPoint } =
      await this.usersRepository.findUserPoint(userNo);

    if (currentPoint < item.price) {
      throw new ForbiddenException("User doesn't have enough point.");
    }

    const pay = await this.usersRepository.modifyUserCurrentPoint(
      userNo,
      -item.price,
    );

    const result = await this.inventoryRepository.addItemToInventory(
      userNo,
      itemNo,
    );

    return result;
  }

  async useItem(userNo: number, itemNo: number) {
    /**
     * user가 이미 같은 타입의 아이템을 사용하고 있다면 자동으로 바꿔줘야함
     * 즉, 사용할 아이템의 status를 true로 변경하고 기존의 아이템의 status를 false로 전환
     * 이것 역시 트랜잭션을 이용할것
     */
    const haveItem = await this.inventoryRepository.checkInventoryItem(
      userNo,
      itemNo,
    );

    if (!haveItem) {
      throw new NotFoundException("User doesn't have the item");
    }

    const { type } = await this.itemsRepository.getItemType(itemNo);

    await this.inventoryRepository.discardItem(userNo, type);

    await this.inventoryRepository.useItem(userNo, itemNo);

    return "success";
  }
}
