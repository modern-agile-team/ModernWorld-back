import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiCreateBan() {
  return applyDecorators(
    ApiOperation({
      summary: "유저 밴하기",
      description: "너 밴",
    }),

    ApiOkResponse({
      description: "Success",
      content: {
        JSON: {
          example: {
            no: 14,
            uniqueIdentifier: "13번고유식별자",
            content: "string",
            createdAt: "2024-08-19T05:31:10.000Z",
            expiredAt: "2024-08-20T05:31:10.000Z",
          },
        },
      },
    }),

    ApiBadRequestResponse({
      content: {
        JSON: {
          examples: {
            ex1: {
              summary: "userNo가 양의 정수가 아닐 경우",
              value: {
                message: [
                  "userNo must be a positive number",
                  "userNo must be an integer number",
                ],
                error: "Bad Request",
                statusCode: 400,
              },
            },

            ex2: {
              summary: "content가 1자 이상 100자 이하가 아닌 경우",
              value: {
                message: [
                  "content must be longer than or equal to 1 and shorter than or equal to 100 characters",
                ],
                error: "Bad Request",
                statusCode: 400,
              },
            },
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
