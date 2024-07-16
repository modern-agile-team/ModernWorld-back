import { applyDecorators } from "@nestjs/common";
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";

export function ApiDeleteNeighobor() {
  return applyDecorators(
    ApiOperation({
      summary: "이웃 승인 거절하거나 이웃 삭제 API",
      description: "이웃 승인을 거절하거나 이웃을 삭제하는 API입니다.",
    }),
    ApiResponse({
      status: 201,
      description: "이웃 승인 거절 & 이웃을 삭제하는 데 성공한 경우",
      content: {
        JSON: {
          example: {
            no: 3,
            senderNo: 1,
            receiverNo: 4,
            status: true,
            createdAt: "2024-07-15T10:52:38.000Z",
          },
        },
      },
    }),

    ApiNotFoundResponse({
      status: 404,
      description: "해당 이웃을 찾을 수 없는 경우",
      content: {
        JSON: {
          example: {
            message: "해당 이웃을 찾을 수 없습니다.",
            error: "Not Found",
            statusCode: 404,
          },
        },
      },
    }),

    ApiInternalServerErrorResponse({
      status: 500,
      description: "서버 오류가 발생한 경우",
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
