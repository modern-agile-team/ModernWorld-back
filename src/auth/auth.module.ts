import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { TokenService } from "./token.service";
import { TokenRepository } from "./token.repository";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [UsersModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, TokenService, TokenRepository],
})
export class AuthModule {}
