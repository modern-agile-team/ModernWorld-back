import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";

export function ApiGoogleLogin() {
  return applyDecorators(
    ApiOperation({
      summary: "구글 로그인 API",
      description: "구글 로그인 API",
    }),
    ApiResponse({
      status: 201,
      description: "성공적으로 로그인 된 경우 (리프레시 토큰은 쿠키로 전달됨)",
      content: {
        JSON: {
          example: {
            accessToken: "여기에 액세스 토큰",
            refreshToken: "여기에 리프레시 토큰",
            nickname:
              "여기에 닉네임(null이면 신규 유저거나 닉네임을 설정하지 않은 유저)",
            userNo: "여기에 유저 번호",
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
            message: "Invalid authorization code.",
            error: "Unauthorized",
            statusCode: 401,
          },
        },
      },
    }),
    ApiResponse({
      status: 403,
      description: "403 error",
      content: {
        JSON: {
          examples: {
            "Banned User": {
              value: {
                message:
                  "Banned User (밴 만료 기간 ex)2024-08-23T05:08:33.000Z )",
                error: "Forbidden",
                statusCode: 403,
              },
              description: "밴된 유저(일시적 밴)",
            },
            "Permanently Banned User": {
              value: {
                message: "Permanently Banned User",
                error: "Forbidden",
                statusCode: 403,
              },
              description: "밴된 유저(영구 밴)",
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
            message: "로그인 중 서버에러가 발생했습니다.",
            error: "Internal Server Error",
            statusCode: 500,
          },
        },
      },
    }),
    ApiQuery({
      name: "code",
      description: "구글 인가코드",
      required: true,
    }),
  );
}
