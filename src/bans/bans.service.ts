import { Injectable } from "@nestjs/common";
import { BansRepository } from "./bans.repository";
import { CreateBanDto } from "./dtos/create-ban.dto";

@Injectable()
export class BansService {
  constructor(private readonly bansRepository: BansRepository) {}

  async createBan(body: CreateBanDto) {
    const { content, expiredAt } = body;

    const uniqueIdentifier = "asd";

    return this.bansRepository.createBan(content, uniqueIdentifier, expiredAt);
  }
}
