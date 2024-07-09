import {
  BadRequestException,
  ExecutionContext,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class AccessTokenAuthGuard extends AuthGuard("accessToken") {
  handleRequest(
    err: any,
    user: any,
    info: { message: string | Record<string, any> },
    context: ExecutionContext,
  ) {
    try {
      if (user) {
        return super.handleRequest(err, user, info, context);
      }

      if (err instanceof HttpException) {
        console.log(err.message);
        throw err;
      }

      throw new HttpException(info.message, 401);
    } catch (error) {
      if (error.message === "jwt expired") {
        console.log(error.message);
        throw new HttpException("jwt expired", 401);
      }
      if (error.message === "invalid token") {
        console.log(error.message);
        throw new HttpException("invalid token", 400);
      }
      if (error.message === "invalid signature") {
        console.log(error.message);
        throw new HttpException("invalid signature", 400);
      } else {
        console.log(error.message);
        throw new HttpException("jwt error", 400);
      }
    }
  }
}

@Injectable()
export class RefreshTokenAuthGuard extends AuthGuard("refreshToken") {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers["authorization"];
    if (!authorization) {
      throw new BadRequestException("jwt must be provided");
    }
    return super.canActivate(context);
  }

  handleRequest(
    err: any,
    user: any,
    info: { message: string | Record<string, any> },
    context: ExecutionContext,
  ) {
    try {
      if (user) {
        return super.handleRequest(err, user, info, context);
      }

      if (err instanceof HttpException) {
        console.log(err.message);
        throw err;
      }

      throw new UnauthorizedException(info.message);
    } catch (error) {
      if (error.message === "jwt expired") {
        throw new UnauthorizedException("jwt expired");
      }
      if (error.message === "invalid token") {
        throw new BadRequestException("invalid token");
      }
      if (error.message === "invalid signature") {
        throw new BadRequestException("invalid signature");
      }
      if (error.message === "Token not found.") {
        throw new NotFoundException("Token not found.");
      } else {
        console.log(error.message);
        throw new BadRequestException("jwt error");
      }
    }
  }
}
