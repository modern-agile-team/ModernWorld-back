import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ItemsRepository } from "./items.repository";
import { InventoryRepository } from "src/inventory/inventory.repository";
import { UsersRepository } from "src/users/users.repository";
@Injectable()
export class ItemsService {
  constructor(
    private readonly itemsRepository: ItemsRepository,
    private readonly inventoryRepository: InventoryRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async getOneItem(itemNo: number): Promise<object> {
    const result = await this.itemsRepository.getOneItem(itemNo);
    return result;
  }

  async getUserItems(theme?: string): Promise<object> {
    return await this.itemsRepository.getAllItems(theme);
  }

  async presentItem(
    userNo: number,
    itemNo: number,
    receiverNo: number,
  ): Promise<boolean> {
    /**
     * 아이템을 특정유저에게 선물하는 로직
     *
     * 1. 그 아이템이 실제로 아이템 테이블에 존재하는 지 확인 (itemsRepository)
     *
     * 2. 포인트가 아이템 가격보다 높은지 확인 (usersRepository)
     *
     * 3. 선물 받을 유저가 진짜 존재하는지 확인 (usersRepository)
     *
     * 4. present 에 추가 및 포인트 감소(presentsRepository) 트랜잭션으로 묶을것
     */

    const item = await this.itemsRepository.getOneItem(itemNo);

    if (!item) {
      throw new NotFoundException("Item doesn't exist.");
    }

    const { currentPoint } = await this.usersRepository.findUserPoint(userNo);

    if (currentPoint < item.price) {
      throw new ForbiddenException("User doesn't have enough point.");
    }

    const isUser = await this.usersRepository.findUserPoint(receiverNo);

    if (!isUser) {
      throw new NotFoundException("Couldn't find receiver.");
    }

    //4번 과정 마저 할것.
    await this.usersRepository.modifyUserCurrentPoint(userNo, -item.price);
    // const gift = await this

    return true;
  }

  async buyOneItem(userNo: number, itemNo: number): Promise<boolean> {
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

    const item = await this.itemsRepository.getOneItem(itemNo);

    if (!item) {
      throw new NotFoundException("Item doesn't exist.");
    }

    const checkInventoryItem = await this.inventoryRepository.findOneItem(
      userNo,
      itemNo,
    );

    if (checkInventoryItem) {
      throw new ConflictException("User already owns the item.");
    }

    const { currentPoint } = await this.usersRepository.findUserPoint(userNo);

    if (currentPoint < item.price) {
      throw new ForbiddenException("User doesn't have enough point.");
    }

    await this.inventoryRepository.addOneItem(userNo, itemNo);

    await this.usersRepository.modifyUserCurrentPoint(userNo, -item.price);

    return true;
  }

  async useItemDisuseOthers(userNo: number, itemNo: number): Promise<boolean> {
    /**
     * user가 이미 같은 타입의 아이템을 사용하고 있다면 자동으로 바꿔줘야함
     * 즉, 사용할 아이템의 status를 true로 변경하고 기존의 아이템의 status를 false로 전환
     * 이것 역시 트랜잭션을 이용할것
     */
    const item = await this.inventoryRepository.findOneItem(userNo, itemNo);

    if (!item) {
      throw new NotFoundException("User doesn't have the item");
    }

    const { type } = await this.itemsRepository.getItemType(itemNo);

    await this.inventoryRepository.disuseOtherItems(userNo, type);

    await this.inventoryRepository.updateItemStatus(userNo, itemNo);

    return true;
  }
}