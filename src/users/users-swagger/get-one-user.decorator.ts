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
            socialName: "김은우",
            nickname: "끼무뗭떵이",
            description: "끼무뗭",
            currentPoint: 29200,
            accumulationPoint: 64200,
            image: "유저소셜이미지",
            legend: {
              likeCount: 1,
            },
            characterLocker: [
              {
                character: {
                  no: 10,
                  image: "캐릭터 이미지",
                },
              },
            ],
            userAchievement: [
              {
                achievement: {
                  title: "레전드",
                  level: "three",
                },
              },
            ],
            chance: 7,
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
