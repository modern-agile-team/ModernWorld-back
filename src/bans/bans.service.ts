import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { BansRepository } from "./bans.repository";
import { CreateBanDto } from "./dtos/create-ban.dto";
import { UsersRepository } from "src/users/users.repository";
import { TokenService } from "src/auth/services/token.service";
import { TokenRepository } from "src/auth/repositories/token.repository";

@Injectable()
export class BansService {
  constructor(
    private readonly bansRepository: BansRepository,
    private readonly usersRepository: UsersRepository,
    private readonly tokenService: TokenService,
    private readonly tokenRepository: TokenRepository,
  ) {}

  async createBan(adminNo: number, body: CreateBanDto) {
    const { userNo, content, expireDays } = body;

    const { admin } = await this.usersRepository.isAdmin(adminNo);

    if (!admin) throw new ForbiddenException("You are not admin.");

    const user = await this.usersRepository.getUserUniqueIndentifier(userNo);

    if (!user) throw new NotFoundException("User not found.");

    const { uniqueIdentifier } = user;

    const isBanned =
      await this.bansRepository.findBanByUniqueIdentifier(uniqueIdentifier);

    if (isBanned) throw new ConflictException("User is already banned.");

    if (!expireDays) {
      await this.tokenService.delAllRedisTokens(`${userNo}`);

      await this.tokenRepository.deleteTokens(userNo);

      return this.bansRepository.createBan(uniqueIdentifier, content);
    }

    const expiredAt = new Date();

    expiredAt.setDate(expiredAt.getDate() + expireDays);

    await this.tokenService.delAllRedisTokens(`${userNo}`);

    await this.tokenRepository.deleteTokens(userNo);

    return this.bansRepository.createBan(uniqueIdentifier, content, expiredAt);
  }
}
