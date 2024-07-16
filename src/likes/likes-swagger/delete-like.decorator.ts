import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiDeleteLike() {
  return applyDecorators(
    ApiOperation({
      summary: "좋아요 삭제",
    }),

    ApiNoContentResponse({
      description: "Success",
    }),

    ApiBadRequestResponse({
      description: "param의 userNo가 양의 정수가 아닐 경우",
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

    ApiNotFoundResponse({
      description: "해당하는 유저번호(receiver기준)의 좋아요가 없을 때",
      content: {
        JSON: {
          example: {
            message: "This like doesn't exist.",
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
