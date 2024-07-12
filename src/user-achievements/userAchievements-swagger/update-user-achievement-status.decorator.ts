import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiUpdateUserAchievementStatus() {
  return applyDecorators(
    ApiOperation({
      summary: "유저의 갖고있는 업적 활성화 / 비활성화",
    }),

    ApiOkResponse({
      description: "Success",
      content: {
        JSON: {
          examples: {
            ex1: {
              summary: "사용",
              value: {
                no: 6,
                userNo: 1,
                achievementNo: 6,
                status: true,
              },
            },
            ex2: {
              summary: "사용해제",
              value: {
                no: 6,
                userNo: 1,
                achievementNo: 6,
                status: false,
              },
            },
          },
        },
      },
    }),

    ApiBadRequestResponse({
      description: "Bad Request",
      content: {
        JSON: {
          examples: {
            ex1: {
              summary: "body의 status가 boolean형태가 아닐때",
              value: {
                message: ["status must be a boolean value"],
                error: "Bad Request",
                statusCode: 400,
              },
            },
            ex2: {
              summary: "param의 achievementNo가 number형태가 아닐때",
              value: {
                message: "Validation failed (numeric string is expected)",
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
  );
}
