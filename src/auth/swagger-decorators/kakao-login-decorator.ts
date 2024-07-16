import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";

export function ApiKakaoLogin() {
  return applyDecorators(
    ApiOperation({
      summary: "카카오 로그인 API",
      description: "카카오 로그인 API",
    }),
    ApiResponse({
      status: 201,
      description: "성공적으로 로그인 된 경우 (리프레시 토큰은 쿠키로 전달됨)",
      content: {
        JSON: {
          example: {
            accessToken: "여기에 액세스 토큰",
            refreshToken: "여기에 리프레시 토큰",
          },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: "인가코드가 없는 경우",
      content: {
        JSON: {
          example: {
            message: "인가코드가 없습니다.",
            error: "Bad Request",
            statusCode: 400,
          },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: "유효하지 않은 인가코드인 경우",
      content: {
        JSON: {
          example: {
            message: "유효하지 않은 인가코드입니다.",
            error: "Unauthorized",
            statusCode: 401,
          },
        },
      },
    }),
    ApiResponse({
      status: 500,
      description:
        "인가 코드는 유효하지만 로그인 시도 중 서버에서 에러가 발생한 경우",
      content: {
        JSON: {
          example: {
            message: "로그인 중 서버에러가 발생했습니다.",
            error: "Internal Server Error",
            statusCode: 500,
          },
        },
      },
    }),
    ApiQuery({
      name: "code",
      description: "카카오 인가코드",
      required: true,
    }),
  );
}