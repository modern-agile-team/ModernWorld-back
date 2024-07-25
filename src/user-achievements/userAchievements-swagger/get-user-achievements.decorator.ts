import { applyDecorators } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiGetUserAchievements() {
  return applyDecorators(
    ApiOperation({
      summary: "유저의 갖고있는 업적 조회",
    }),

    ApiOkResponse({
      description: "Success",
      content: {
        JSON: {
          example: [
            {
              no: 1,
              userNo: 1,
              achievementNo: 1,
              status: true,
              achievement: {
                name: "commentCount1",
                description: "1번 업적 설명",
                title: "1번 업적 칭호",
                level: "one",
              },
            },
            {
              no: 2,
              userNo: 1,
              achievementNo: 2,
              status: false,
              achievement: {
                name: "commentCount2",
                description: "2번 업적 설명",
                title: "2번 업적 칭호",
                level: "two",
              },
            },
            {
              no: 3,
              userNo: 1,
              achievementNo: 3,
              status: false,
              achievement: {
                name: "commentCount3",
                description: "3번 업적 설명",
                title: "3번 업적 칭호",
                level: "three",
              },
            },
            {
              no: 4,
              userNo: 1,
              achievementNo: 4,
              status: false,
              achievement: {
                name: "likeCount1",
                description: "4번 업적 설명",
                title: "4번 업적 칭호",
                level: "one",
              },
            },
            {
              no: 5,
              userNo: 1,
              achievementNo: 5,
              status: false,
              achievement: {
                name: "likeCount2",
                description: "5번 업적 설명",
                title: "5번 업적 칭호",
                level: "two",
              },
            },
            {
              no: 6,
              userNo: 1,
              achievementNo: 6,
              status: false,
              achievement: {
                name: "likeCount3",
                description: "6번 업적 설명",
                title: "6번 업적 칭호",
                level: "three",
              },
            },
            {
              no: 19,
              userNo: 1,
              achievementNo: 7,
              status: false,
              achievement: {
                name: "attendanceCount1",
                description: "7번 업적 설명",
                title: "7번 업적 칭호",
                level: "one",
              },
            },
          ],
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
