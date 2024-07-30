import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from "@nestjs/swagger";

export function ApiGetUserNamePointAchievementTitle() {
  return applyDecorators(
    ApiOperation({
      summary: "한 유저 조회",
    }),

    ApiParam({
      name: "userNo",
      example: 1,
      description: "유저 번호",
    }),

    ApiOkResponse({
      description: "성공",
      content: {
        JSON: {
          example: {
            data: {
              nickname: "엄준식",
              currentPoint: 3000,
              accumulationPoint: 2100,
              description: "1번소개",
              image: "1번이미지",
              legend: {
                likeCount: 60,
              },
              characterLocker: [
                {
                  character: {
                    image: "3번 cat 이미지",
                  },
                },
              ],
              userAchievement: [
                {
                  achievement: {
                    title: "1번 업적 칭호",
                    level: "one",
                  },
                },
              ],
            },
          },
        },
      },
    }),

    ApiBadRequestResponse({
      description: "param의 userNo가 양의 정수가 아닐경우",
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
