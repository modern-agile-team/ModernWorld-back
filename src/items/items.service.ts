import { Injectable } from "@nestjs/common";
import { ItemsRepository } from "./items.repository";
@Injectable()
export class ItemsService {
  constructor(private readonly itemsRepository: ItemsRepository) {}

  async getOneItem(itemNo: number): Promise<object> {
    const result = await this.itemsRepository.getOneItem(itemNo);
    return result;
  }

  async getUserItems(theme?: string): Promise<object> {
    return await this.itemsRepository.getAllItems(theme);
  }
}
