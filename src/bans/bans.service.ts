import { Injectable } from "@nestjs/common";
import { BansRepository } from "./bans.repository";
import { CreateBanDto } from "./dtos/create-ban.dto";

@Injectable()
export class BansService {
  constructor(private readonly bansRepository: BansRepository) {}

  async createBan(body: CreateBanDto) {
    const { userNo, content, expireDays } = body;

    const uniqueIdentifier = "asd";
    const expiredAt = new Date();

    return this.bansRepository.createBan(uniqueIdentifier, content, expiredAt);
  }
}
