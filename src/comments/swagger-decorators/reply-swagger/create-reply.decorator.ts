import { applyDecorators } from "@nestjs/common";
import {
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";

export function ApiCreateReply() {
  return applyDecorators(
    ApiOperation({
      summary: "방명록의 댓글을 생성하는 API",
      description: "방명록의 댓글을 생성합니다.",
    }),

    ApiResponse({
      status: 201,
      description: "방명록의 댓글을 성공적으로 생성한 경우",
      content: {
        JSON: {
          example: {
            no: 27,
            commentNo: 11,
            userNo: 1,
            content: "asd",
            createdAt: "2024-06-26T08:38:00.000Z",
            deletedAt: null,
          },
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
