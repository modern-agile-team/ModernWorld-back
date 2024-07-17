import { applyDecorators } from "@nestjs/common";
import {
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";

export function ApiUpdateReply() {
  return applyDecorators(
    ApiOperation({
      summary: "방명록의 댓글을 수정하는 API",
      description: "방명록의 댓글을 수정합니다.",
    }),

    ApiResponse({
      status: 200,
      description: "방명록의 댓글을 성공적으로 수정한 경우",
      content: {
        JSON: {
          example: {},
        },
      },
    }),

    ApiResponse({
      status: 404,
      description: "댓글이 DB에 존재하지 않는 경우",
      content: {
        JSON: {
          example: { statusCode: 404, message: "존재하지 않는 댓글입니다." },
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
