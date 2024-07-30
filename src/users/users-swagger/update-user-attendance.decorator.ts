import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
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
              "0": [0, 100],
              "1": [2, 200],
              "2": [0, 300],
              "3": [0, 200],
              "4": [0, 400],
              "5": [0, 300],
              "6": [0, 300],
            },
          },
        },
      },
    }),

    ApiBadRequestResponse({
      description: "stickerNo가 1 ~ 10 사이의 정수가 아닌 경우",
      content: {
        JSON: {
          example: {
            message: [
              "stickerNo must be an integer number",
              "stickerNo must not be greater than 10",
              "stickerNo must not be less than 1",
            ],
            error: "Bad Request",
            statusCode: 400,
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

    ApiBearerAuth("access-token"),
  );
}
