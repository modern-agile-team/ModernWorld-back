import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiDeleteNeighobor() {
  return applyDecorators(
    ApiOperation({
      summary: "이웃 승인 거절하거나 이웃 삭제 API",
    }),

    ApiNoContentResponse({ description: "Success" }),

    ApiBadRequestResponse({
      description: "param의 neighborNo가 양의 정수가 아닌 경우",
      content: {
        JSON: {
          example: {
            message: "Validation failed (positive int string is expected)",
            error: "Bad Request",
            statusCode: 400,
          },
        },
      },
    }),

    ApiForbiddenResponse({
      description: "이웃 요청 거절 및 삭제를 본인 아닌 사람이 하는 경우",
      content: {
        JSON: {
          example: {
            message:
              "You can only delete the neighbor request you received and your neighbor.",
            error: "Forbidden",
            statusCode: 403,
          },
        },
      },
    }),

    ApiNotFoundResponse({
      description: "해당 이웃을 찾을 수 없는 경우",
      content: {
        JSON: {
          example: {
            message: "No neighbor found",
            error: "Not Found",
            statusCode: 404,
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
