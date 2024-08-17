import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { BansRepository } from "./bans.repository";
import { CreateBanDto } from "./dtos/create-ban.dto";
import { UsersRepository } from "src/users/users.repository";
import { RedisService } from "src/auth/redis/redis.service";
import { TokenRepository } from "src/auth/repositories/token.repository";

@Injectable()
export class BansService {
  constructor(
    private readonly bansRepository: BansRepository,
    private readonly usersRepository: UsersRepository,
    private readonly redisService: RedisService,
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
      await this.deleteAllTokens(userNo);

      return this.bansRepository.createBan(uniqueIdentifier, content);
    }

    const expiredAt = new Date();

    expiredAt.setDate(expiredAt.getDate() + expireDays);

    await this.deleteAllTokens(userNo);

    return this.bansRepository.createBan(uniqueIdentifier, content, expiredAt);
  }

  private async deleteAllTokens(userNo: number) {
    await this.redisService.delToken(userNo.toString() + "-refreshToken");
    await this.redisService.delToken(userNo.toString() + "-accessToken");

    return this.tokenRepository.deleteTokens(userNo);
  }
}
