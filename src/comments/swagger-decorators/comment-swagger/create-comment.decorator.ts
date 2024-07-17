import { applyDecorators } from "@nestjs/common";
import {
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";

export function ApiCreateComment() {
  return applyDecorators(
    ApiOperation({
      summary: "방명록 생성하는 API",
      description: "방명록을 생성합니다.",
    }),
    ApiResponse({
      status: 201,
      description: "댓글을 성공적으로 생성한 경우",
      content: {
        JSON: {
          example: {
            no: 98,
            receiverNo: 1,
            senderNo: 1,
            content: "모던애자일 사랑해요.",
            createdAt: "2024-06-26T08:36:44.000Z",
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
