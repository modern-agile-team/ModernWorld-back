import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from "@nestjs/swagger";

export function ApiGetOneUser() {
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
            no: 1,
            nickname: "1번닉네임",
            description: "1번소개",
            currentPoint: 0,
            accumulationPoint: 0,
            image: "1번이미지",
            legend: {
              likeCount: 7,
            },
            characterLocker: [
              {
                character: {
                  no: 1,
                  image: "1번 dog 이미지",
                },
              },
            ],
            userAchievement: [
              {
                achievement: {
                  title: "커뮤 초보자",
                  level: "one",
                },
              },
            ],
            chance: 10,
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
