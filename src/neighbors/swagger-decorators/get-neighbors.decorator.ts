import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiGetNeighbor() {
  return applyDecorators(
    ApiOperation({
      summary: "이웃 조회",
    }),

    ApiOkResponse({
      description: "Success",
      content: {
        JSON: {
          examples: {
            ex1: {
              summary: "status가 true인 경우",
              description:
                "이웃인 사람들을 조회합니다. 이때 type의 영향을 받지 않습니다.",
              value: {
                data: [
                  {
                    no: 19,
                    createdAt: "2024-08-01T16:22:15.000Z",
                    status: true,
                    neighbor: {
                      no: 11,
                      nickname: "11번닉네임",
                      image: "11번이미지",
                      description: "11번소개",
                      userAchievement: [],
                    },
                  },
                  {
                    no: 17,
                    createdAt: "2024-08-01T16:22:15.000Z",
                    status: true,
                    neighbor: {
                      no: 5,
                      nickname: "5번닉네임",
                      image: "5번이미지",
                      description: "5번소개",
                      userAchievement: [],
                    },
                  },
                  {
                    no: 14,
                    createdAt: "2024-08-01T16:22:15.000Z",
                    status: true,
                    neighbor: {
                      no: 2,
                      nickname: "2번닉네임",
                      image: "2번이미지",
                      description: "2번소개",
                      userAchievement: [],
                    },
                  },
                  {
                    no: 13,
                    createdAt: "2024-08-01T16:22:15.000Z",
                    status: true,
                    neighbor: {
                      no: 1,
                      nickname: "1",
                      image:
                        "https://wang0514.s3.ap-northeast-2.amazonaws.com/page/BaseProfileImage/pngwing.com.png",
                      description: null,
                      userAchievement: [],
                    },
                  },
                ],
                meta: {
                  page: 1,
                  take: 10,
                  totalCount: 4,
                  totalPage: 1,
                },
              },
            },
            ex2: {
              summary: "status가 false인 경우 && type이 senderNo인 경우",
              description: "이웃 신청을 보낸 경우만 조회합니다.",
              value: {
                data: [
                  {
                    data: [
                      {
                        no: 22,
                        createdAt: "2024-08-01T16:21:40.000Z",
                        status: false,
                        neighbor: {
                          no: 12,
                          nickname: "12번닉네임",
                          image: "12번이미지",
                          description: "12번소개",
                          userAchievement: [],
                        },
                      },
                      {
                        no: 21,
                        createdAt: "2024-08-01T16:21:37.000Z",
                        status: false,
                        neighbor: {
                          no: 22,
                          nickname: "22번닉네임",
                          image: "22번이미지",
                          description: "22번소개",
                          userAchievement: [],
                        },
                      },
                      {
                        no: 20,
                        createdAt: "2024-08-01T16:21:36.000Z",
                        status: false,
                        neighbor: {
                          no: 31,
                          nickname: "쌉악질",
                          image:
                            "https://phinf.pstatic.net/contact/20230524_5/1684868987987elDzd_PNG/%C8%AD%B8%E9_%C4%B8%C3%B3_2023-05-03_120045.png",
                          description: "김은우 학살자",
                          userAchievement: [],
                        },
                      },
                      {
                        no: 18,
                        createdAt: "2024-08-01T15:46:25.000Z",
                        status: false,
                        neighbor: {
                          no: 6,
                          nickname: "6번닉네임",
                          image: "6번이미지",
                          description: "6번소개",
                          userAchievement: [],
                        },
                      },
                      {
                        no: 16,
                        createdAt: "2024-08-01T15:46:23.000Z",
                        status: false,
                        neighbor: {
                          no: 4,
                          nickname: "4번닉네임",
                          image: "4번이미지",
                          description: "4번소개",
                          userAchievement: [],
                        },
                      },
                      {
                        no: 15,
                        createdAt: "2024-08-01T15:46:22.000Z",
                        status: false,
                        neighbor: {
                          no: 3,
                          nickname: "3번닉네임",
                          image: "3번이미지",
                          description: "3번소개",
                          userAchievement: [],
                        },
                      },
                    ],
                    meta: {
                      page: 1,
                      take: 10,
                      totalCount: 6,
                      totalPage: 1,
                    },
                  },
                ],
                meta: {
                  page: 1,
                  take: 10,
                  totalCount: 4,
                  totalPage: 1,
                },
              },
            },
            ex3: {
              summary: "status가 false인 경우 && type이 receiverNo인 경우",
              description: "이웃 신청을 받은 경우만 조회합니다.",
              value: {
                data: [
                  {
                    no: 25,
                    createdAt: "2024-08-01T16:21:40.000Z",
                    status: false,
                    neighbor: {
                      no: 9,
                      nickname: "9번닉네임",
                      image: "9번이미지",
                      description: "9번소개",
                      userAchievement: [],
                    },
                  },
                  {
                    no: 24,
                    createdAt: "2024-08-01T16:21:40.000Z",
                    status: false,
                    neighbor: {
                      no: 8,
                      nickname: "8번닉네임",
                      image: "8번이미지",
                      description: "8번소개",
                      userAchievement: [],
                    },
                  },
                  {
                    no: 23,
                    createdAt: "2024-08-01T16:21:40.000Z",
                    status: false,
                    neighbor: {
                      no: 7,
                      nickname: "7번닉네임",
                      image: "7번이미지",
                      description: "7번소개",
                      userAchievement: [],
                    },
                  },
                ],
                meta: {
                  page: 1,
                  take: 10,
                  totalCount: 3,
                  totalPage: 1,
                },
              },
            },
            ex4: {
              summary: "status와 type 둘 다 값을 주지 않았을 때",
              description:
                "status와 type을 주지 않으면 모든 이웃 신청을 조회합니다.",
              value: {
                data: [
                  {
                    no: 25,
                    createdAt: "2024-08-01T16:21:40.000Z",
                    status: false,
                    neighbor: {
                      no: 9,
                      nickname: "9번닉네임",
                      image: "9번이미지",
                      description: "9번소개",
                      userAchievement: [],
                    },
                  },
                  {
                    no: 24,
                    createdAt: "2024-08-01T16:21:40.000Z",
                    status: false,
                    neighbor: {
                      no: 8,
                      nickname: "8번닉네임",
                      image: "8번이미지",
                      description: "8번소개",
                      userAchievement: [],
                    },
                  },
                  {
                    no: 23,
                    createdAt: "2024-08-01T16:21:40.000Z",
                    status: false,
                    neighbor: {
                      no: 7,
                      nickname: "7번닉네임",
                      image: "7번이미지",
                      description: "7번소개",
                      userAchievement: [],
                    },
                  },
                  {
                    no: 22,
                    createdAt: "2024-08-01T16:21:40.000Z",
                    status: false,
                    neighbor: {
                      no: 12,
                      nickname: "12번닉네임",
                      image: "12번이미지",
                      description: "12번소개",
                      userAchievement: [],
                    },
                  },
                  {
                    no: 21,
                    createdAt: "2024-08-01T16:21:37.000Z",
                    status: false,
                    neighbor: {
                      no: 22,
                      nickname: "22번닉네임",
                      image: "22번이미지",
                      description: "22번소개",
                      userAchievement: [],
                    },
                  },
                  {
                    no: 20,
                    createdAt: "2024-08-01T16:21:36.000Z",
                    status: false,
                    neighbor: {
                      no: 31,
                      nickname: "쌉악질",
                      image:
                        "https://phinf.pstatic.net/contact/20230524_5/1684868987987elDzd_PNG/%C8%AD%B8%E9_%C4%B8%C3%B3_2023-05-03_120045.png",
                      description: "김은우 학살자",
                      userAchievement: [],
                    },
                  },
                  {
                    no: 18,
                    createdAt: "2024-08-01T15:46:25.000Z",
                    status: false,
                    neighbor: {
                      no: 6,
                      nickname: "6번닉네임",
                      image: "6번이미지",
                      description: "6번소개",
                      userAchievement: [],
                    },
                  },
                  {
                    no: 16,
                    createdAt: "2024-08-01T15:46:23.000Z",
                    status: false,
                    neighbor: {
                      no: 4,
                      nickname: "4번닉네임",
                      image: "4번이미지",
                      description: "4번소개",
                      userAchievement: [],
                    },
                  },
                  {
                    no: 15,
                    createdAt: "2024-08-01T15:46:22.000Z",
                    status: false,
                    neighbor: {
                      no: 3,
                      nickname: "3번닉네임",
                      image: "3번이미지",
                      description: "3번소개",
                      userAchievement: [],
                    },
                  },
                ],
                meta: {
                  page: 1,
                  take: 10,
                  totalCount: 9,
                  totalPage: 1,
                },
              },
            },
          },
        },
      },
    }),

    ApiBadRequestResponse({
      content: {
        JSON: {
          examples: {
            ex1: {
              summary: "query의 page가 양의 정수가 아닐 경우",
              value: {
                message: [
                  "page must be a positive number",
                  "page must be an integer number",
                ],
                error: "Bad Request",
                statusCode: 400,
              },
            },

            ex2: {
              summary: "query의 take가 양의 정수가 아닐 경우",
              value: {
                message: [
                  "take must be a positive number",
                  "take must be an integer number",
                ],
                error: "Bad Request",
                statusCode: 400,
              },
            },

            ex3: {
              summary: "query의 orderBy가 asc, desc가 아닐 경우",
              value: {
                message: [
                  "orderBy must be one of the following values: asc, desc",
                ],
                error: "Bad Request",
                statusCode: 400,
              },
            },

            ex4: {
              summary: "query의 type이 senderNo, receiverNo가 아닐 경우",
              value: {
                message: [
                  "type must be one of the following values: senderNo, receiverNo",
                ],
                error: "Bad Request",
                statusCode: 400,
              },
            },

            ex5: {
              summary: "param의 userNo가 양의 정수가 아닐 경우",
              value: {
                message: "Validation failed (positive int string is expected)",
                error: "Bad Request",
                statusCode: 400,
              },
            },
            ex6: {
              summary: "status의 값이 boolean이 아닐 경우",
              value: {
                message: "Invalid boolean value.",
                error: "Bad Request",
                statusCode: 400,
              },
            },
          },
        },
      },
    }),

    ApiInternalServerErrorResponse({
      description: "Internal Server Error",
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
