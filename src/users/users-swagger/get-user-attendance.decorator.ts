import { applyDecorators } from "@nestjs/common";
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiGetUserAttendance() {
  return applyDecorators(
    ApiOperation({
      summary: "유저 출석부 조회",
    }),

    ApiOkResponse({
      description: "Success",
      content: {
        JSON: {
          example: {
            "0": [false, 100],
            "1": [false, 200],
            "2": [false, 300],
            "3": [false, 200],
            "4": [false, 400],
            "5": [false, 300],
            "6": [false, 300],
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
