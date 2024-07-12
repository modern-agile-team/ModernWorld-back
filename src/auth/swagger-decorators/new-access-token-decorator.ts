import { applyDecorators } from "@nestjs/common";
import { ApiCookieAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";

export function ApiNewAccessToken() {
  return applyDecorators(
    ApiOperation({
      summary: "액세스 토큰 재발급 API",
      description: "액세스 토큰 재발급 API",
    }),
    ApiResponse({
      status: 200,
      description: "성공적으로 액세스 토큰을 재발급 받은 경우",
      content: { JSON: { example: { accessToken: "여기에 액세스 토큰" } } },
    }),
    ApiResponse({
      status: 400,
      description: "400 error",
      content: {
        JSON: {
          examples: {
            "invalid token": {
              value: {
                message: "invalid token",
                error: "Bad Request",
                statusCode: 400,
              },
              description: "유효하지 않은 토큰인 경우",
            },
            "Cookie has no refresh token": {
              value: {
                message: "Cookie has no refresh token",
                error: "Bad Request",
                statusCode: 400,
              },
              description: "쿠키에 리프레시 토큰이 없는 경우",
            },
            "not refresh token type": {
              value: {
                message: "not refresh token type",
                error: "Bad Request",
                statusCode: 400,
              },
              description: "토큰 타입이 리프레시 토큰이 아닌 경우",
            },
            "jwt must be provided": {
              value: {
                message: "jwt must be provided",
                error: "Bad Request",
                statusCode: 400,
              },
              description: "토큰이 제공되지 않은 경우",
            },
            "invalid signature": {
              value: {
                message: "invalid signature",
                error: "Bad Request",
                statusCode: 400,
              },
              description: "우리 서비스의 액세스 토큰이 아닌 경우",
            },
            "jwt error": {
              value: {
                message: "jwt error",
                error: "Bad Request",
                statusCode: 400,
              },
              description: "그 외 에러 (안진우에게 연락주세요..ㅎ)",
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: "401 error",
      content: {
        JSON: {
          examples: {
            "jwt expired": {
              value: {
                message: "jwt expired",
                error: "Unauthorized",
                statusCode: 401,
              },
              description: "만료된 토큰인 경우",
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: "404 error",
      content: {
        JSON: {
          examples: {
            "Token not found.": {
              value: {
                message: "Token not found.",
                error: "Not Found",
                statusCode: 404,
              },
              description: "리프레시 토큰이 Redis에 없는 경우",
            },
            "token is not matched.": {
              value: {
                message: "token is not matched.",
                error: "Not Found",
                statusCode: 404,
              },
              description:
                "요청한 토큰과 Redis에 저장된 토큰이 일치하지 않는 경우",
            },
          },
        },
      },
    }),
    ApiCookieAuth("refresh-token"),
  );
}
