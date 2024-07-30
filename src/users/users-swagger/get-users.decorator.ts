import { applyDecorators } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiGetUsers() {
  return applyDecorators(
    ApiOperation({
      summary: "유저 조회",
    }),

    ApiOkResponse({
      description: "성공",
      content: {
        JSON: {
          example: {
            data: [
              {
                nickname: "25번닉네임",
                description: "25번소개",
                createdAt: "2024-07-01T05:00:45.000Z",
                accumulationPoint: 0,
                legend: {
                  likeCount: 2,
                },
                userAchievement: [],
                characterLocker: [
                  {
                    character: {
                      image: "4번 dog 이미지",
                    },
                  },
                ],
              },
              {
                nickname: "24번닉네임",
                description: "24번소개",
                createdAt: "2024-07-01T05:00:45.000Z",
                accumulationPoint: 0,
                legend: {
                  likeCount: 2,
                },
                userAchievement: [],
                characterLocker: [
                  {
                    character: {
                      image: "1번 cat 이미지",
                    },
                  },
                ],
              },
              {
                nickname: "23번닉네임",
                description: "23번소개",
                createdAt: "2024-07-01T05:00:45.000Z",
                accumulationPoint: 0,
                legend: {
                  likeCount: 2,
                },
                userAchievement: [],
                characterLocker: [
                  {
                    character: {
                      image: "7번 dog 이미지",
                    },
                  },
                ],
              },
              {
                nickname: "22번닉네임",
                description: "22번소개",
                createdAt: "2024-07-01T05:00:45.000Z",
                accumulationPoint: 0,
                legend: {
                  likeCount: 2,
                },
                userAchievement: [],
                characterLocker: [
                  {
                    character: {
                      image: "5번 dog 이미지",
                    },
                  },
                ],
              },
              {
                nickname: "21번닉네임",
                description: "21번소개",
                createdAt: "2024-07-01T05:00:45.000Z",
                accumulationPoint: 0,
                legend: {
                  likeCount: 2,
                },
                userAchievement: [],
                characterLocker: [
                  {
                    character: {
                      image: "2번 dog 이미지",
                    },
                  },
                ],
              },
            ],
            meta: {
              page: 2,
              take: 5,
              totalCount: 30,
              totalPage: 6,
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

    ApiBearerAuth("access-token"),
  );
}
