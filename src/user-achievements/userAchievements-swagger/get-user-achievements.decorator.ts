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
              no: 31,
              userNo: 31,
              achievementNo: 1,
              status: false,
              achievement: {
                title: "커뮤 초보자",
                description: "댓글을 적으니 좋습니다.",
                level: "one",
              },
            },
            {
              no: 33,
              userNo: 31,
              achievementNo: 10,
              status: false,
              achievement: {
                title: "부자는 아님",
                description: "은근히 모으셨군요.",
                level: "one",
              },
            },
            {
              no: 34,
              userNo: 31,
              achievementNo: 13,
              status: false,
              achievement: {
                title: "선함",
                description: "이렇게 많이 선물을?",
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
