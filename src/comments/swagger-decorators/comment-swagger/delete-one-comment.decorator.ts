import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiDeleteOneComment() {
  return applyDecorators(
    ApiOperation({
      summary: "방명록 삭제하는 API",
      description: "방명록을 삭제합니다.",
    }),

    ApiNoContentResponse({ description: "Success" }),

    ApiBadRequestResponse({
      description: "param의 commentNo가 양의 정수가 아닌 경우",
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
      description: "본인의 방명록이 아닌 경우",
      content: {
        JSON: {
          example: {
            message: "User can delete only their comment.",
            error: "Forbidden",
            statusCode: 403,
          },
        },
      },
    }),

    ApiNotFoundResponse({
      description: "해당 번호의 comment가 존재하지 않는 경우",
      content: {
        JSON: {
          example: {
            message: "There is no comment with that number.",
            error: "Not Found",
            statusCode: 404,
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
