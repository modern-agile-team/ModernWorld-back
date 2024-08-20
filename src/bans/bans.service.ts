import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { BansRepository } from "./bans.repository";
import { CreateBanDto } from "./dtos/create-ban.dto";
import { UsersRepository } from "src/users/users.repository";
import { TokenService } from "src/auth/services/token.service";
import { TokenRepository } from "src/auth/repositories/token.repository";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class BansService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
    private readonly bansRepository: BansRepository,
    private readonly usersRepository: UsersRepository,
    private readonly tokenService: TokenService,
    private readonly tokenRepository: TokenRepository,
  ) {}

  async checkBan(uniqueIdentifier: string) {
    const userBanInfo =
      await this.bansRepository.findBanByUniqueIdentifier(uniqueIdentifier);

    if (userBanInfo) {
      if (!userBanInfo.expiredAt) {
        throw new ForbiddenException("Permanently Banned User");
      }
      if (userBanInfo.expiredAt > new Date()) {
        throw new ForbiddenException("Banned User");
      }
      await this.bansRepository.deleteBanByUniqueIdentifier(uniqueIdentifier);
    }
  }

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
      return this.executeBan(userNo, uniqueIdentifier, content);
    }

    const expiredAt = new Date();

    expiredAt.setDate(expiredAt.getDate() + expireDays);

    return this.executeBan(userNo, uniqueIdentifier, content, expiredAt);
  }

  private async executeBan(
    userNo: number,
    uniqueIdentifier: string,
    content: string,
    expiredAt?: Date,
  ) {
    await this.tokenService.delAllRedisTokens(`${userNo}`);

    try {
      return (
        await this.prisma.$transaction([
          this.tokenRepository.deleteTokens(userNo),
          this.bansRepository.createBan(uniqueIdentifier, content, expiredAt),
        ])
      )[1];
    } catch (err) {
      this.logger.error(`transaction Error : ${err}`);
      throw new InternalServerErrorException();
    }
  }
}
