import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { ItemsRepository } from "src/items/items.repository";
import { InventoryRepository } from "./inventory.repository";
import { UsersRepository } from "src/users/users.repository";
import { GetUserItemsDto } from "./dtos/get-user-items.dto";
import { UpdateUserItemStatusDto } from "./dtos/update-user-item-status.dto";
import { ItemNoDto } from "./dtos/item-no.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { LegendsRepository } from "src/legends/legends.repository";
import { UserAchievementsService } from "src/user-achievements/user-achievements.service";

@Injectable()
export class InventoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
    private readonly inventoryRepository: InventoryRepository,
    private readonly itemsRepository: ItemsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly legendsRepository: LegendsRepository,
    private readonly userAchievementsService: UserAchievementsService,
  ) {}
  getUserItems(userNo: number, query: GetUserItemsDto) {
    const { theme, status, itemName } = query;

    return this.inventoryRepository.getUserItems(
      userNo,
      theme,
      status,
      itemName,
    );
  }

  async createUserOneItem(userNo: number, body: ItemNoDto) {
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

    const { itemNo } = body;

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

    try {
      return this.prisma.$transaction(async (tx) => {
        await this.legendsRepository.updateOneLegendByUserNo(
          userNo,
          {
            itemCount: { increment: 1 },
          },
          tx,
        );

        await this.userAchievementsService.checkAchievementCondition(
          userNo,
          "itemCount",
          tx,
        );

        await this.usersRepository.updateUserCurrentPoint(
          userNo,
          -item.price,
          tx,
        );

        return this.inventoryRepository.createUserOneItem(userNo, itemNo, tx);
      });
    } catch (err) {
      this.logger.error(`transaction Error : ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async updateItemStatus(
    userNo: number,
    itemNo: number,
    body: UpdateUserItemStatusDto,
  ) {
    /**
     * user가 이미 같은 타입의 아이템을 사용하고 있다면 자동으로 바꿔줘야함
     * 즉, 사용할 아이템의 status를 true로 변경하고 기존의 아이템의 status를 false로 전환
     * 이것 역시 트랜잭션을 이용할것
     */

    const item = await this.inventoryRepository.findOneItem(userNo, itemNo);

    if (!item) {
      throw new NotFoundException("User doesn't have the item");
    }

    const { status } = body;

    if (!status) {
      return this.inventoryRepository.updateItemStatus(item.no, status);
    }

    const { type } = await this.itemsRepository.getItemType(itemNo);

    try {
      const [, result] = await this.prisma.$transaction([
        this.inventoryRepository.disuseOtherItems(userNo, type),
        this.inventoryRepository.updateItemStatus(item.no, status),
      ]);

      return result;
    } catch (err) {
      this.logger.error(`transaction Error : ${err}`);
      throw new InternalServerErrorException();
    }
  }
}
