import { Injectable } from "@nestjs/common";
import { ItemsRepository } from "./items.repository";
import { GetUserAllItems } from "./dtos/get-user-all-items.dto";

@Injectable()
export class ItemsService {
  constructor(private readonly itemsRepository: ItemsRepository) {}

  getItems(query: GetUserAllItems) {
    const { theme, itemName } = query;

    return this.itemsRepository.getItems(theme, itemName);
  }

  getOneItem(itemNo: number) {
    return this.itemsRepository.getOneItem(itemNo);
  }
}
