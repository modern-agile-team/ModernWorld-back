import { applyDecorators } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { AccessTokenAuthGuard } from "src/auth/jwt/jwt.guard";

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
            nickname: "쌉악질",
            attendance: {
              "0": [0, 100],
              "1": [2, 200],
              "2": [0, 300],
              "3": [0, 200],
              "4": [0, 400],
              "5": [7, 300],
              "6": [0, 300],
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
