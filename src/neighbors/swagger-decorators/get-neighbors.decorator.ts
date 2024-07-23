import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiGetNeighbor() {
  return applyDecorators(
    ApiOperation({
      summary: "neighbor 조회",
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
                    neighborSenderNo: {
                      no: 10,
                      nickname: "10번닉네임",
                    },
                    createdAt: "2024-07-22T16:02:00.000Z",
                    status: true,
                  },
                  {
                    no: 14,
                    neighborReceiverNo: {
                      no: 3,
                      nickname: "3번닉네임",
                    },
                    createdAt: "2024-07-19T16:22:02.000Z",
                    status: true,
                  },
                  {
                    no: 10,
                    neighborSenderNo: {
                      no: 8,
                      nickname: "8번닉네임",
                    },
                    createdAt: "2024-07-16T19:55:27.000Z",
                    status: true,
                  },
                  {
                    no: 3,
                    neighborReceiverNo: {
                      no: 4,
                      nickname: "4번닉네임",
                    },
                    createdAt: "2024-07-15T10:52:38.000Z",
                    status: true,
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
                    no: 18,
                    neighborReceiverNo: {
                      no: 19,
                      nickname: "19번닉네임",
                    },
                    createdAt: "2024-07-22T14:46:08.000Z",
                    status: false,
                  },
                  {
                    no: 17,
                    neighborReceiverNo: {
                      no: 14,
                      nickname: "14번닉네임",
                    },
                    createdAt: "2024-07-22T14:46:04.000Z",
                    status: false,
                  },
                  {
                    no: 16,
                    neighborReceiverNo: {
                      no: 15,
                      nickname: "15번닉네임",
                    },
                    createdAt: "2024-07-22T14:45:58.000Z",
                    status: false,
                  },
                  {
                    no: 15,
                    neighborReceiverNo: {
                      no: 13,
                      nickname: "13번닉네임",
                    },
                    createdAt: "2024-07-19T20:29:05.000Z",
                    status: false,
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
                    no: 26,
                    neighborSenderNo: {
                      no: 27,
                      nickname: "27번닉네임",
                    },
                    createdAt: "2024-07-22T14:51:06.000Z",
                    status: false,
                  },
                  {
                    no: 25,
                    neighborSenderNo: {
                      no: 24,
                      nickname: "24번닉네임",
                    },
                    createdAt: "2024-07-22T14:50:44.000Z",
                    status: false,
                  },
                ],
                meta: {
                  page: 1,
                  take: 10,
                  totalCount: 2,
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
                    no: 26,
                    neighborSenderNo: {
                      no: 27,
                      nickname: "27번닉네임",
                    },
                    createdAt: "2024-07-22T14:51:06.000Z",
                    status: false,
                  },
                  {
                    no: 25,
                    neighborSenderNo: {
                      no: 24,
                      nickname: "24번닉네임",
                    },
                    createdAt: "2024-07-22T14:50:44.000Z",
                    status: false,
                  },
                  {
                    no: 18,
                    neighborReceiverNo: {
                      no: 19,
                      nickname: "19번닉네임",
                    },
                    createdAt: "2024-07-22T14:46:08.000Z",
                    status: false,
                  },
                  {
                    no: 17,
                    neighborReceiverNo: {
                      no: 14,
                      nickname: "14번닉네임",
                    },
                    createdAt: "2024-07-22T14:46:04.000Z",
                    status: false,
                  },
                  {
                    no: 16,
                    neighborReceiverNo: {
                      no: 15,
                      nickname: "15번닉네임",
                    },
                    createdAt: "2024-07-22T14:45:58.000Z",
                    status: false,
                  },
                  {
                    no: 15,
                    neighborReceiverNo: {
                      no: 13,
                      nickname: "13번닉네임",
                    },
                    createdAt: "2024-07-19T20:29:05.000Z",
                    status: false,
                  },
                ],
                meta: {
                  page: 1,
                  take: 10,
                  totalCount: 6,
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
  );
}
