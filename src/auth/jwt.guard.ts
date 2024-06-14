import { ExecutionContext, HttpException, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

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
      } else {
        console.log(error.message);
        throw new HttpException("jwt error", 400);
      }
    }
  }
}

@Injectable()
export class RefreshTokenAuthGuard extends AuthGuard("refreshToken") {
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
      } else {
        console.log(error.message);
        throw new HttpException("jwt error", 400);
      }
    }
  }
}
