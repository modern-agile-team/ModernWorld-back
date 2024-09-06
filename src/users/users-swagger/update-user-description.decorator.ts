import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiUpdateUserDescription() {
  return applyDecorators(
    ApiOperation({
      summary: "유저 자기소개 변경",
    }),

    ApiOkResponse({
      description: "성공",
      content: {
        JSON: {
          example: {
            no: 1,
            description: "엄준식왕덕봉샌즈파피루스엔더맨TV",
          },
        },
      },
    }),

    ApiBadRequestResponse({
      description: "100글자 초과라면",
      content: {
        JSON: {
          example: {
            message: [
              "description must be shorter than or equal to 100 characters",
            ],
            error: "Bad Request",
            statusCode: 400,
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

    ApiBearerAuth("access-token"),
  );
}
