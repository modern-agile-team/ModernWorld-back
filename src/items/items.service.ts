import { Injectable } from "@nestjs/common";
import { ItemsRepository } from "./items.repository";
import { GetUserAllItems } from "./dtos/get-user-all-items.dto";
import { PrismaPromise, item } from "@prisma/client";
@Injectable()
export class ItemsService {
  constructor(private readonly itemsRepository: ItemsRepository) {}

  getItems(queryParams: GetUserAllItems) {
    const { theme, itemName } = queryParams;

    return this.itemsRepository.getItems(theme, itemName);
  }

  getOneItem(itemNo: number) {
    return this.itemsRepository.getOneItem(itemNo);
  }
}
