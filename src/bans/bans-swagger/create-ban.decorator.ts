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
      summary: "캐릭터 불러오기",
      description: "유저가 보유한 것과 상관없이 캐릭터만 불러옵니다.",
    }),

    ApiOkResponse({
      description: "Success",
      content: {
        JSON: {},
      },
    }),

    ApiBadRequestResponse({
      description: "cat, dog 이외의 값을 넣었을 때",
      content: {
        JSON: {
          example: {
            message: ["species must be one of the following values: cat, dog"],
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
