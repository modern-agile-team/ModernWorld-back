import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";

export function ApiKakaoUnlink() {
  return applyDecorators(
    ApiOperation({
      summary: "카카오 회원탈퇴 API",
      description: "카카오 회원탈퇴 API",
    }),
    ApiResponse({
      status: 200,
      description: "성공적으로 회원탈퇴가 된 경우",
      content: {
        JSON: { example: { message: "카카오 회원탈퇴 성공." } },
      },
    }),
    ApiResponse({
      status: 400,
      description: "400 error",
      content: {
        JSON: {
          examples: {
            "Authorization header is missing.": {
              value: {
                message: "Authorization header is missing.",
                error: "Bad Request",
                statusCode: 400,
              },
              description: "헤더에 액세스 토큰이 없는 경우",
            },
            "not access token type": {
              value: {
                message: "not access token type",
                error: "Bad Request",
                statusCode: 400,
              },
              description: "토큰 타입이 액세스 토큰이 아닌 경우",
            },
            "jwt must be provided": {
              value: {
                message: "jwt must be provided",
                error: "Bad Request",
                statusCode: 400,
              },
              description: "토큰이 제공되지 않은 경우",
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
            "invalid token": {
              value: {
                message: "invalid token",
                error: "Unauthorized",
                statusCode: 401,
              },
              description: "유효하지 않은 토큰인 경우",
            },
            "incorrect token": {
              value: {
                message: "incorrect token",
                error: "Unauthorized",
                statusCode: 401,
              },
              description: "우리 서비스의 토큰이 아닌 경우",
            },
            "jwt expired": {
              value: {
                message: "jwt expired",
                error: "Unauthorized",
                statusCode: 401,
              },
              description: "만료된 토큰인 경우",
            },
            "You are not a user logged in with Kakao.": {
              value: {
                message: "You are not a user logged in with Kakao.",
                error: "Unauthorized",
                statusCode: 401,
              },
              description: "카카오로 로그인한 유저가 아닌 경우",
            },
            "jwt error": {
              value: {
                message: "jwt error",
                error: "Unauthorized",
                statusCode: 401,
              },
              description: "그 외 에러 (안진우에게 연락주세요..ㅎ)",
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
              description: "액세스 토큰이 Redis에 없는 경우",
            },
            "user not found": {
              value: {
                message: "user not found",
                error: "Not Found",
                statusCode: 404,
              },
              description: "유저를 찾을 수 없는 경우",
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 409,
      description: "409 error",
      content: {
        JSON: {
          examples: {
            "token is not matched.": {
              value: {
                message: "token is not matched.",
                error: "Conflict",
                statusCode: 409,
              },
              description:
                "요청한 토큰과 Redis에 저장된 토큰이 일치하지 않는 경우",
            },

            "Invalid user": {
              value: {
                message: "Invalid user",
                error: "Conflict",
                statusCode: 409,
              },
              description:
                "요청한 유저와 db에 저장된 유저가 일치하지 않는 경우",
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 500,
      description: "Internal server error",
      content: {
        JSON: {
          example: {
            message: "로그아웃 중 서버에러가 발생했습니다.",
            error: "Internal Server Error",
            statusCode: 500,
          },
        },
      },
    }),
    ApiBearerAuth("access-token"),
  );
}
