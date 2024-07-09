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
        throw new UnauthorizedException(error.message);
      }
      if (error.message === "invalid token") {
        throw new BadRequestException(error.message);
      }
      if (error.message === "invalid signature") {
        throw new BadRequestException(error.message);
      }
      if (error.message === "Token not found.") {
        throw new NotFoundException(error.message);
      } else {
        console.log(error);
        throw new BadRequestException(error.message);
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
    const authorization = request.cookies["refreshToken"];
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
        throw new UnauthorizedException(error.message);
      }
      if (error.message === "invalid token") {
        throw new BadRequestException(error.message);
      }
      if (error.message === "invalid signature") {
        throw new BadRequestException(error.message);
      }
      if (error.message === "Token not found.") {
        throw new NotFoundException(error.message);
      } else {
        console.log(error);
        throw new BadRequestException("jwt error");
      }
    }
  }
}
