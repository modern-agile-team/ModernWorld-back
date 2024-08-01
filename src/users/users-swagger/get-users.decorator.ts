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
                no: 34,
                nickname: "asd",
                description: null,
                createdAt: "2024-07-26T11:48:35.000Z",
                accumulationPoint: 0,
                legend: null,
                userAchievement: [],
                characterLocker: [],
              },
              {
                no: 1,
                nickname: "1",
                description: null,
                createdAt: "2024-07-26T11:48:07.000Z",
                accumulationPoint: 0,
                legend: {
                  likeCount: 1,
                },
                userAchievement: [],
                characterLocker: [],
              },
              {
                no: 31,
                nickname: "쌉악질",
                description: "김은우 학살자",
                createdAt: "2024-07-25T07:57:17.000Z",
                accumulationPoint: 10300,
                legend: {
                  likeCount: 0,
                },
                userAchievement: [],
                characterLocker: [],
              },
              {
                no: 30,
                nickname: "30번닉네임",
                description: "30번소개",
                createdAt: "2024-07-01T05:00:46.000Z",
                accumulationPoint: 0,
                legend: {
                  likeCount: 2,
                },
                userAchievement: [],
                characterLocker: [
                  {
                    character: {
                      image: "3번 cat 이미지",
                    },
                  },
                ],
              },
              {
                no: 29,
                nickname: "29번닉네임",
                description: "29번소개",
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
              {
                no: 28,
                nickname: "28번닉네임",
                description: "28번소개",
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
                no: 27,
                nickname: "27번닉네임",
                description: "27번소개",
                createdAt: "2024-07-01T05:00:45.000Z",
                accumulationPoint: 0,
                legend: {
                  likeCount: 2,
                },
                userAchievement: [],
                characterLocker: [
                  {
                    character: {
                      image: "3번 cat 이미지",
                    },
                  },
                ],
              },
              {
                no: 26,
                nickname: "26번닉네임",
                description: "26번소개",
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
              {
                no: 25,
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
                no: 24,
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
            ],
            meta: {
              page: 1,
              take: 10,
              totalCount: 32,
              totalPage: 4,
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
