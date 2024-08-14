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
                category: "소통왕",
              },
            },
            {
              no: 35,
              userNo: 31,
              achievementNo: 2,
              status: false,
              achievement: {
                title: "커뮤 중급자",
                description: "댓글이 넘쳐납니다!",
                level: "two",
                category: "소통왕",
              },
            },
            {
              no: 36,
              userNo: 31,
              achievementNo: 3,
              status: true,
              achievement: {
                title: "커뮤 고급자",
                description: "소통왕이네요.",
                level: "three",
                category: "소통왕",
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
                category: "수집왕",
              },
            },
            {
              no: 37,
              userNo: 31,
              achievementNo: 12,
              status: false,
              achievement: {
                title: "부자",
                description: "진정한 부자이십니다.",
                level: "three",
                category: "수집왕",
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
                category: "선물왕",
              },
            },
            {
              no: 38,
              userNo: 31,
              achievementNo: 14,
              status: false,
              achievement: {
                title: "기부왕",
                description: "천사 이십니까?",
                level: "two",
                category: "선물왕",
              },
            },
            {
              no: 39,
              userNo: 31,
              achievementNo: 15,
              status: false,
              achievement: {
                title: "기부천사",
                description: "착한 자에게는 복을",
                level: "three",
                category: "선물왕",
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
