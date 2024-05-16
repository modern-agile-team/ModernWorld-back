import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { TokenService } from "./token.service";
import { TokenRepository } from "./token.repository";
import { JwtService } from "@nestjs/jwt";


@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, TokenService, TokenRepository, JwtService],
})
export class AuthModule {}
