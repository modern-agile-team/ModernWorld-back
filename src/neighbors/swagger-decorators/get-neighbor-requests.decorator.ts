import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiGetNeighoborRequsets() {
  return applyDecorators(
    ApiOperation({
      summary: "neighbor request 조회",
    }),
    ApiOkResponse({
      description: "Success",
      content: {
        JSON: {
          examples: {
            ex1: {
              summary: "type을 아무것도 안 준 경우",
              description: "쓴 것/ 받은 것 포함해서 조회합니다.",
              value: {
                data: [
                  {
                    no: 26,
                    NeighborSenderNo: {
                      no: 27,
                      nickname: "27번닉네임",
                    },
                    NeighborReceiverNo: {
                      no: 1,
                      nickname: "1번닉네임",
                    },
                    createdAt: "2024-07-22T14:51:06.000Z",
                    status: false,
                  },
                  {
                    no: 25,
                    NeighborSenderNo: {
                      no: 24,
                      nickname: "24번닉네임",
                    },
                    NeighborReceiverNo: {
                      no: 1,
                      nickname: "1번닉네임",
                    },
                    createdAt: "2024-07-22T14:50:44.000Z",
                    status: false,
                  },
                  {
                    no: 19,
                    NeighborSenderNo: {
                      no: 10,
                      nickname: "10번닉네임",
                    },
                    NeighborReceiverNo: {
                      no: 1,
                      nickname: "1번닉네임",
                    },
                    createdAt: "2024-07-22T14:48:16.000Z",
                    status: false,
                  },
                  {
                    no: 18,
                    NeighborSenderNo: {
                      no: 1,
                      nickname: "1번닉네임",
                    },
                    NeighborReceiverNo: {
                      no: 19,
                      nickname: "19번닉네임",
                    },
                    createdAt: "2024-07-22T14:46:08.000Z",
                    status: false,
                  },
                  {
                    no: 17,
                    NeighborSenderNo: {
                      no: 1,
                      nickname: "1번닉네임",
                    },
                    NeighborReceiverNo: {
                      no: 14,
                      nickname: "14번닉네임",
                    },
                    createdAt: "2024-07-22T14:46:04.000Z",
                    status: false,
                  },
                  {
                    no: 16,
                    NeighborSenderNo: {
                      no: 1,
                      nickname: "1번닉네임",
                    },
                    NeighborReceiverNo: {
                      no: 15,
                      nickname: "15번닉네임",
                    },
                    createdAt: "2024-07-22T14:45:58.000Z",
                    status: false,
                  },
                  {
                    no: 15,
                    NeighborSenderNo: {
                      no: 1,
                      nickname: "1번닉네임",
                    },
                    NeighborReceiverNo: {
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
                  totalCount: 7,
                  totalPage: 1,
                },
              },
            },
            ex2: {
              summary: "type을 senderNo로 보낸 경우",
              description: "보낸 것만 조회합니다.",
              value: {
                data: [
                  {
                    no: 18,
                    NeighborSenderNo: {
                      no: 1,
                      nickname: "1번닉네임",
                    },
                    NeighborReceiverNo: {
                      no: 19,
                      nickname: "19번닉네임",
                    },
                    createdAt: "2024-07-22T14:46:08.000Z",
                    status: false,
                  },
                  {
                    no: 17,
                    NeighborSenderNo: {
                      no: 1,
                      nickname: "1번닉네임",
                    },
                    NeighborReceiverNo: {
                      no: 14,
                      nickname: "14번닉네임",
                    },
                    createdAt: "2024-07-22T14:46:04.000Z",
                    status: false,
                  },
                  {
                    no: 16,
                    NeighborSenderNo: {
                      no: 1,
                      nickname: "1번닉네임",
                    },
                    NeighborReceiverNo: {
                      no: 15,
                      nickname: "15번닉네임",
                    },
                    createdAt: "2024-07-22T14:45:58.000Z",
                    status: false,
                  },
                  {
                    no: 15,
                    NeighborSenderNo: {
                      no: 1,
                      nickname: "1번닉네임",
                    },
                    NeighborReceiverNo: {
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
              summary: "type을 receiverNo로 보낸 경우",
              description: "받은 것만 조회합니다.",
              value: {
                data: [
                  {
                    no: 26,
                    NeighborSenderNo: {
                      no: 27,
                      nickname: "27번닉네임",
                    },
                    NeighborReceiverNo: {
                      no: 1,
                      nickname: "1번닉네임",
                    },
                    createdAt: "2024-07-22T14:51:06.000Z",
                    status: false,
                  },
                  {
                    no: 25,
                    NeighborSenderNo: {
                      no: 24,
                      nickname: "24번닉네임",
                    },
                    NeighborReceiverNo: {
                      no: 1,
                      nickname: "1번닉네임",
                    },
                    createdAt: "2024-07-22T14:50:44.000Z",
                    status: false,
                  },
                  {
                    no: 19,
                    NeighborSenderNo: {
                      no: 10,
                      nickname: "10번닉네임",
                    },
                    NeighborReceiverNo: {
                      no: 1,
                      nickname: "1번닉네임",
                    },
                    createdAt: "2024-07-22T14:48:16.000Z",
                    status: false,
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
