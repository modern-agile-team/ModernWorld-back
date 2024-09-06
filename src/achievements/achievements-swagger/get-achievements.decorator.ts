import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiGetAchievements() {
  return applyDecorators(
    ApiOperation({
      summary: "모든 업적 조회",
      description: "어떤 업적이 있는지 조회합니다.",
    }),

    ApiOkResponse({
      description: "Success",
      content: {
        JSON: {
          example: [
            {
              no: 1,
              title: "1번 업적 칭호",
              description: "1번 업적 설명",
              level: "one",
              point: 100,
            },
            {
              no: 2,
              title: "2번 업적 칭호",
              description: "2번 업적 설명",
              level: "two",
              point: 100,
            },
            {
              no: 3,
              title: "3번 업적 칭호",
              description: "3번 업적 설명",
              level: "three",
              point: 100,
            },
            {
              no: 4,
              title: "4번 업적 칭호",
              description: "4번 업적 설명",
              level: "one",
              point: 100,
            },
            {
              no: 5,
              title: "5번 업적 칭호",
              description: "5번 업적 설명",
              level: "two",
              point: 100,
            },
            {
              no: 6,
              title: "6번 업적 칭호",
              description: "6번 업적 설명",
              level: "three",
              point: 100,
            },
            {
              no: 7,
              title: "7번 업적 칭호",
              description: "7번 업적 설명",
              level: "one",
              point: 100,
            },
            {
              no: 8,
              title: "8번 업적 칭호",
              description: "8번 업적 설명",
              level: "two",
              point: 100,
            },
            {
              no: 9,
              title: "9번 업적 칭호",
              description: "9번 업적 설명",
              level: "three",
              point: 100,
            },
            {
              no: 10,
              title: "10번 업적 칭호",
              description: "10번 업적 설명",
              level: "one",
              point: 100,
            },
            {
              no: 11,
              title: "11번 업적 칭호",
              description: "11번 업적 설명",
              level: "two",
              point: 100,
            },
            {
              no: 12,
              title: "12번 업적 칭호",
              description: "12번 업적 설명",
              level: "three",
              point: 100,
            },
            {
              no: 13,
              title: "13번 업적 칭호",
              description: "13번 업적 설명",
              level: "one",
              point: 100,
            },
            {
              no: 14,
              title: "14번 업적 칭호",
              description: "14번 업적 설명",
              level: "two",
              point: 100,
            },
            {
              no: 15,
              title: "15번 업적 칭호",
              description: "15번 업적 설명",
              level: "three",
              point: 100,
            },
          ],
        },
      },
    }),

    ApiBadRequestResponse({
      description: "level의 값을 enum과 다르게 넣었을경우",
      content: {
        JSON: {
          example: {
            message: [
              "level must be one of the following values: one, two, three",
            ],
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
