import { applyDecorators } from "@nestjs/common";
import {
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
