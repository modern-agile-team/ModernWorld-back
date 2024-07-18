import { applyDecorators } from "@nestjs/common";
import {
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";

export function ApiDeleteOneReply() {
  return applyDecorators(
    ApiOperation({
      summary: "방명록의 댓글 삭제하는 API",
      description: "방명록의 댓글을 삭제합니다.",
    }),

    ApiResponse({
      status: 200,
      description: "댓글을 성공적으로 삭제한 경우",
      content: {
        JSON: {
          example: {},
        },
      },
    }),

    ApiResponse({
      status: 401,
      description: "본인의 댓글이 아닌 경우",
      content: {
        JSON: {
          example: { statusCode: 401, message: "본인의 댓글이 아닙니다." },
        },
      },
    }),

    ApiInternalServerErrorResponse({
      description: "Internal server error",
      content: {
        JSON: {
          example: {
            statusCode: 500,
            message: "Internal server error",
          },
        },
      },
    }),
  );
}
