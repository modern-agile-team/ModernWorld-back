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
                no: 30,
                nickname: "30번닉네임",
                description: "30번소개",
                accumulationPoint: 0,
                createdAt: "2024-08-02T01:44:32.000Z",
                legend: {
                  likeCount: 2,
                },
                characterLocker: [
                  {
                    character: {
                      no: 3,
                      image: "3번 dog 이미지",
                    },
                  },
                ],
                userAchievement: [],
                chance: 10,
              },
              {
                no: 29,
                nickname: "29번닉네임",
                description: "29번소개",
                accumulationPoint: 0,
                createdAt: "2024-08-02T01:44:32.000Z",
                legend: {
                  likeCount: 2,
                },
                characterLocker: [
                  {
                    character: {
                      no: 2,
                      image: "2번 cat 이미지",
                    },
                  },
                ],
                userAchievement: [],
                chance: 10,
              },
              {
                no: 28,
                nickname: "28번닉네임",
                description: "28번소개",
                accumulationPoint: 0,
                createdAt: "2024-08-02T01:44:32.000Z",
                legend: {
                  likeCount: 2,
                },
                characterLocker: [
                  {
                    character: {
                      no: 1,
                      image: "1번 dog 이미지",
                    },
                  },
                ],
                userAchievement: [],
                chance: 10,
              },
              {
                no: 27,
                nickname: "27번닉네임",
                description: "27번소개",
                accumulationPoint: 0,
                createdAt: "2024-08-02T01:44:32.000Z",
                legend: {
                  likeCount: 2,
                },
                characterLocker: [
                  {
                    character: {
                      no: 3,
                      image: "3번 dog 이미지",
                    },
                  },
                ],
                userAchievement: [],
                chance: 10,
              },
              {
                no: 26,
                nickname: "26번닉네임",
                description: "26번소개",
                accumulationPoint: 0,
                createdAt: "2024-08-02T01:44:32.000Z",
                legend: {
                  likeCount: 2,
                },
                characterLocker: [
                  {
                    character: {
                      no: 2,
                      image: "2번 cat 이미지",
                    },
                  },
                ],
                userAchievement: [],
                chance: 10,
              },
              {
                no: 25,
                nickname: "25번닉네임",
                description: "25번소개",
                accumulationPoint: 0,
                createdAt: "2024-08-02T01:44:32.000Z",
                legend: {
                  likeCount: 2,
                },
                characterLocker: [
                  {
                    character: {
                      no: 4,
                      image: "4번 dog 이미지",
                    },
                  },
                ],
                userAchievement: [],
                chance: 10,
              },
              {
                no: 24,
                nickname: "24번닉네임",
                description: "24번소개",
                accumulationPoint: 0,
                createdAt: "2024-08-02T01:44:32.000Z",
                legend: {
                  likeCount: 2,
                },
                characterLocker: [
                  {
                    character: {
                      no: 1,
                      image: "1번 dog 이미지",
                    },
                  },
                ],
                userAchievement: [],
                chance: 10,
              },
              {
                no: 23,
                nickname: "23번닉네임",
                description: "23번소개",
                accumulationPoint: 0,
                createdAt: "2024-08-02T01:44:32.000Z",
                legend: {
                  likeCount: 2,
                },
                characterLocker: [
                  {
                    character: {
                      no: 7,
                      image: "7번 dog 이미지",
                    },
                  },
                ],
                userAchievement: [],
                chance: 10,
              },
              {
                no: 22,
                nickname: "22번닉네임",
                description: "22번소개",
                accumulationPoint: 0,
                createdAt: "2024-08-02T01:44:32.000Z",
                legend: {
                  likeCount: 2,
                },
                characterLocker: [
                  {
                    character: {
                      no: 5,
                      image: "5번 cat 이미지",
                    },
                  },
                ],
                userAchievement: [],
                chance: 10,
              },
              {
                no: 21,
                nickname: "21번닉네임",
                description: "21번소개",
                accumulationPoint: 0,
                createdAt: "2024-08-02T01:44:32.000Z",
                legend: {
                  likeCount: 2,
                },
                characterLocker: [
                  {
                    character: {
                      no: 2,
                      image: "2번 cat 이미지",
                    },
                  },
                ],
                userAchievement: [],
                chance: 10,
              },
            ],
            meta: {
              page: 1,
              take: 10,
              totalCount: 30,
              totalPage: 3,
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
