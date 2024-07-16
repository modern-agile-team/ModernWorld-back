import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";

export function ApiUpdateNeighobor() {
  return applyDecorators(
    ApiOperation({
      summary: "이웃 승인 API",
      description: "이웃 신청을 승인하는 API입니다.",
    }),
    ApiResponse({
      status: 201,
      description: "이웃 승인을 성공한 경우",
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

    ApiBadRequestResponse({
      status: 404,
      description: "존재하지 않는 이웃신청인 경우",
      content: {
        JSON: {
          example: {
            message: "존재하지 않는 이웃요청입니다.",
            error: "Not Found",
            statusCode: 404,
          },
        },
      },
    }),

    ApiConflictResponse({
      status: 409,
      description: "이미 승인된 이웃 신청인 경우",
      content: {
        JSON: {
          example: {
            message: "이미 승인 처리된 이웃요청입니다.",
            error: "Conflict",
            statusCode: 409,
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
