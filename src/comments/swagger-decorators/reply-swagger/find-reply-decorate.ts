import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

export function ApiFindRelies() {
  return applyDecorators(
    ApiOperation({
      summary: "방명록의 댓글 조회하는 API",
      description: "방명록의 댓글을 조회합니다.",
    }),
    ApiResponse({
      status: 200,
      description: "댓글을 성공적으로 조회한 경우",
      content: {
        JSON: {
          example: {},
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: "우리 서비스의 액세스 토큰이 아닌 경우",
      content: {
        JSON: {
          example: { statusCode: 401, message: "유효하지 않은 토큰입니다." },
        },
      },
    }),
    ApiResponse({
      status: 403,
      description: "만료된 액세스 토큰인 경우",
      content: {
        JSON: {
          example: { statusCode: 403, message: "만료된 토큰입니다." },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: "액세스 토큰이 제공되지 않은 경우",
      content: {
        JSON: {
          example: { statusCode: 400, message: "토큰이 제공되지 않았습니다." },
        },
      },
    }),
    ApiResponse({
      status: 500,
      description: "방명록의 댓글을 조회하는 데 오류가 발생한 경우",
      content: {
        JSON: {
          example: {
            statusCode: 500,
            message: "Internal server error",
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: "방명록이 DB에 존재하지 않는 경우",
      content: {
        JSON: {
          example: { statusCode: 404, message: "존재하지 않는 방명록입니다." },
        },
      },
    }),
  );
}
