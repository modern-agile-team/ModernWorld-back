import {
  BadRequestException,
  ExecutionContext,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  Logger,
  ConflictException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class AccessTokenAuthGuard extends AuthGuard("accessToken") {
  constructor(private readonly logger: Logger) {
    super();
  }
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
        throw new UnauthorizedException(error.message);
      }
      if (error.message === "invalid signature") {
        throw new UnauthorizedException("incorrect token");
      }
      if (error.message === "Token not found.") {
        throw new NotFoundException(error.message);
      }
      if (error.message === "token is not matched.") {
        throw new ConflictException(error.message);
      } else {
        this.logger.error(error);
        throw new UnauthorizedException("jwt error");
      }
    }
  }
}

@Injectable()
export class RefreshTokenAuthGuard extends AuthGuard("refreshToken") {
  constructor(private readonly logger: Logger) {
    super();
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(1 + request.cookies);
    console.log(2 + request);
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
        throw new UnauthorizedException(error.message);
      }
      if (error.message === "invalid signature") {
        throw new UnauthorizedException("incorrect token");
      }
      if (error.message === "Token not found.") {
        throw new NotFoundException(error.message);
      }
      if (error.message === "token is not matched.") {
        throw new ConflictException(error.message);
      } else {
        this.logger.error(error);
        throw new UnauthorizedException("jwt error");
      }
    }
  }
}
