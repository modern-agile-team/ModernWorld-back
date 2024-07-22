import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiForbiddenResponse,
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

    ApiForbiddenResponse({
      description: "본인이 받은 이웃요청이 아닌 경우",
      content: {
        JSON: {
          example: {
            message: "This is not a neighbor request you received.",
            error: "Forbidden",
            statusCode: 403,
          },
        },
      },
    }),

    ApiBadRequestResponse({
      description: "존재하지 않는 이웃신청인 경우",
      content: {
        JSON: {
          example: {
            message: "Non-existent neighbor request.",
            error: "Not Found",
            statusCode: 404,
          },
        },
      },
    }),

    ApiConflictResponse({
      description: "이미 승인된 이웃 신청인 경우",
      content: {
        JSON: {
          example: {
            message:
              "This is a neighbor request that has already been approved.",
            error: "Conflict",
            statusCode: 409,
          },
        },
      },
    }),

    ApiInternalServerErrorResponse({
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
