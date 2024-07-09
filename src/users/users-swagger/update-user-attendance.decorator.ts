import { applyDecorators } from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiUpdateUserAttendance() {
  return applyDecorators(
    ApiOperation({
      summary: "유저 출석부 수정(출석)",
    }),

    ApiOkResponse({
      description: "성공",
      content: {
        JSON: {
          example: {
            nickname: "1번닉네임",
            attendance: {
              "0": [false, 100],
              "1": [false, 200],
              "2": [true, 300],
              "3": [false, 200],
              "4": [false, 400],
              "5": [false, 300],
              "6": [false, 300],
            },
          },
        },
      },
    }),

    ApiConflictResponse({
      description: "이미 출석한 경우",
      content: {
        JSON: {
          example: {
            message: "already attended",
            error: "Conflict",
            statusCode: 409,
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
