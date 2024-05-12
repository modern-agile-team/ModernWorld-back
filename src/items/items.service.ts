import { Injectable } from "@nestjs/common";
import { ItemsRepository } from "./items.repository";
import { GetUserAllItems } from "./dtos/get-user-all-items.dto";
@Injectable()
export class ItemsService {
  constructor(private readonly itemsRepository: ItemsRepository) {}

  getOneItem(itemNo: number): Promise<object> {
    return this.itemsRepository.getOneItem(itemNo);
  }

  getUserItems(queryParams: GetUserAllItems): Promise<object> {
    const { theme, itemName } = queryParams;

    return this.itemsRepository.getAllItems(theme, itemName);
  }
}
