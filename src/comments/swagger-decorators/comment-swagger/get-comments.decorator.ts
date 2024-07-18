import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiGetComments() {
  return applyDecorators(
    ApiOperation({ summary: "comment 조회" }),

    ApiOkResponse({
      description: "Success",
      content: {
        JSON: {
          examples: {
            ex1: {
              summary: "type을 아무것도 안준 경우",
              description: "쓴것 / 받은것 포함해서 조회합니다",
              value: {
                data: [
                  {
                    no: 94,
                    content: "밥먹고 싶어요22",
                    createdAt: "2024-07-17T01:55:56.000Z",
                    commentReceiver: {
                      no: 2,
                      nickname: "2번닉네임",
                    },
                    commentSender: {
                      no: 1,
                      nickname: "1번 닉네임",
                    },
                    _count: {
                      reply: 0,
                    },
                  },
                  {
                    no: 70,
                    content: "Message text sample",
                    createdAt: "2024-07-01T05:00:46.000Z",
                    commentReceiver: {
                      no: 19,
                      nickname: "19번닉네임",
                    },
                    commentSender: {
                      no: 1,
                      nickname: "1번 닉네임",
                    },
                    _count: {
                      reply: 0,
                    },
                  },
                  {
                    no: 60,
                    content: "Sample text 5",
                    createdAt: "2024-07-01T05:00:46.000Z",
                    commentReceiver: {
                      no: 14,
                      nickname: "14번닉네임",
                    },
                    commentSender: {
                      no: 1,
                      nickname: "1번 닉네임",
                    },
                    _count: {
                      reply: 0,
                    },
                  },
                  {
                    no: 41,
                    content: "Another content example",
                    createdAt: "2024-07-01T05:00:46.000Z",
                    commentReceiver: {
                      no: 8,
                      nickname: "8번닉네임",
                    },
                    commentSender: {
                      no: 1,
                      nickname: "1번 닉네임",
                    },
                    _count: {
                      reply: 0,
                    },
                  },
                  {
                    no: 26,
                    content: "Random content 4",
                    createdAt: "2024-07-01T05:00:46.000Z",
                    commentReceiver: {
                      no: 5,
                      nickname: "5번닉네임",
                    },
                    commentSender: {
                      no: 1,
                      nickname: "1번 닉네임",
                    },
                    _count: {
                      reply: 0,
                    },
                  },
                  {
                    no: 10,
                    content: "Another random content",
                    createdAt: "2024-07-01T05:00:46.000Z",
                    commentReceiver: {
                      no: 1,
                      nickname: "1번 닉네임",
                    },
                    commentSender: {
                      no: 22,
                      nickname: "22번닉네임",
                    },
                    _count: {
                      reply: 0,
                    },
                  },
                  {
                    no: 9,
                    content: "Sample text",
                    createdAt: "2024-07-01T05:00:46.000Z",
                    commentReceiver: {
                      no: 1,
                      nickname: "1번 닉네임",
                    },
                    commentSender: {
                      no: 7,
                      nickname: "7번닉네임",
                    },
                    _count: {
                      reply: 0,
                    },
                  },
                  {
                    no: 8,
                    content: "Test message",
                    createdAt: "2024-07-01T05:00:46.000Z",
                    commentReceiver: {
                      no: 1,
                      nickname: "1번 닉네임",
                    },
                    commentSender: {
                      no: 3,
                      nickname: "3번닉네임",
                    },
                    _count: {
                      reply: 0,
                    },
                  },
                  {
                    no: 7,
                    content: "Random text 2",
                    createdAt: "2024-07-01T05:00:46.000Z",
                    commentReceiver: {
                      no: 1,
                      nickname: "1번 닉네임",
                    },
                    commentSender: {
                      no: 14,
                      nickname: "14번닉네임",
                    },
                    _count: {
                      reply: 0,
                    },
                  },
                  {
                    no: 6,
                    content: "Hello there!",
                    createdAt: "2024-07-01T05:00:46.000Z",
                    commentReceiver: {
                      no: 1,
                      nickname: "1번 닉네임",
                    },
                    commentSender: {
                      no: 12,
                      nickname: "12번닉네임",
                    },
                    _count: {
                      reply: 0,
                    },
                  },
                ],
                meta: {
                  page: 1,
                  take: 10,
                  totalCount: 15,
                  totalPage: 2,
                },
              },
            },

            ex2: {
              summary: "type을 senderNo로 보낸 경우",
              description: "본인이 쓴것들을 조회합니다.",
              value: {
                data: [
                  {
                    no: 94,
                    content: "밥먹고 싶어요22",
                    createdAt: "2024-07-17T01:55:56.000Z",
                    commentReceiver: {
                      no: 2,
                      nickname: "2번닉네임",
                    },
                    commentSender: {
                      no: 1,
                      nickname: "1번 닉네임",
                    },
                    _count: {
                      reply: 0,
                    },
                  },
                  {
                    no: 70,
                    content: "Message text sample",
                    createdAt: "2024-07-01T05:00:46.000Z",
                    commentReceiver: {
                      no: 19,
                      nickname: "19번닉네임",
                    },
                    commentSender: {
                      no: 1,
                      nickname: "1번 닉네임",
                    },
                    _count: {
                      reply: 0,
                    },
                  },
                  {
                    no: 60,
                    content: "Sample text 5",
                    createdAt: "2024-07-01T05:00:46.000Z",
                    commentReceiver: {
                      no: 14,
                      nickname: "14번닉네임",
                    },
                    commentSender: {
                      no: 1,
                      nickname: "1번 닉네임",
                    },
                    _count: {
                      reply: 0,
                    },
                  },
                  {
                    no: 41,
                    content: "Another content example",
                    createdAt: "2024-07-01T05:00:46.000Z",
                    commentReceiver: {
                      no: 8,
                      nickname: "8번닉네임",
                    },
                    commentSender: {
                      no: 1,
                      nickname: "1번 닉네임",
                    },
                    _count: {
                      reply: 0,
                    },
                  },
                  {
                    no: 26,
                    content: "Random content 4",
                    createdAt: "2024-07-01T05:00:46.000Z",
                    commentReceiver: {
                      no: 5,
                      nickname: "5번닉네임",
                    },
                    commentSender: {
                      no: 1,
                      nickname: "1번 닉네임",
                    },
                    _count: {
                      reply: 0,
                    },
                  },
                ],
                meta: {
                  page: 1,
                  take: 10,
                  totalCount: 5,
                  totalPage: 1,
                },
              },
            },

            ex3: {
              summary: "type을 receiverNo로 보낸 경우",
              description: "본인이 받은것들을 조회합니다.",
              value: {
                data: [
                  {
                    no: 10,
                    content: "Another random content",
                    createdAt: "2024-07-01T05:00:46.000Z",
                    commentReceiver: {
                      no: 1,
                      nickname: "1번 닉네임",
                    },
                    commentSender: {
                      no: 22,
                      nickname: "22번닉네임",
                    },
                    _count: {
                      reply: 0,
                    },
                  },
                  {
                    no: 9,
                    content: "Sample text",
                    createdAt: "2024-07-01T05:00:46.000Z",
                    commentReceiver: {
                      no: 1,
                      nickname: "1번 닉네임",
                    },
                    commentSender: {
                      no: 7,
                      nickname: "7번닉네임",
                    },
                    _count: {
                      reply: 0,
                    },
                  },
                  {
                    no: 8,
                    content: "Test message",
                    createdAt: "2024-07-01T05:00:46.000Z",
                    commentReceiver: {
                      no: 1,
                      nickname: "1번 닉네임",
                    },
                    commentSender: {
                      no: 3,
                      nickname: "3번닉네임",
                    },
                    _count: {
                      reply: 0,
                    },
                  },
                  {
                    no: 7,
                    content: "Random text 2",
                    createdAt: "2024-07-01T05:00:46.000Z",
                    commentReceiver: {
                      no: 1,
                      nickname: "1번 닉네임",
                    },
                    commentSender: {
                      no: 14,
                      nickname: "14번닉네임",
                    },
                    _count: {
                      reply: 0,
                    },
                  },
                  {
                    no: 6,
                    content: "Hello there!",
                    createdAt: "2024-07-01T05:00:46.000Z",
                    commentReceiver: {
                      no: 1,
                      nickname: "1번 닉네임",
                    },
                    commentSender: {
                      no: 12,
                      nickname: "12번닉네임",
                    },
                    _count: {
                      reply: 0,
                    },
                  },
                  {
                    no: 5,
                    content: "Some random text",
                    createdAt: "2024-07-01T05:00:46.000Z",
                    commentReceiver: {
                      no: 1,
                      nickname: "1번 닉네임",
                    },
                    commentSender: {
                      no: 20,
                      nickname: "20번닉네임",
                    },
                    _count: {
                      reply: 3,
                    },
                  },
                  {
                    no: 4,
                    content: "Another message",
                    createdAt: "2024-07-01T05:00:46.000Z",
                    commentReceiver: {
                      no: 1,
                      nickname: "1번 닉네임",
                    },
                    commentSender: {
                      no: 17,
                      nickname: "17번닉네임",
                    },
                    _count: {
                      reply: 4,
                    },
                  },
                  {
                    no: 3,
                    content: "This is a message",
                    createdAt: "2024-07-01T05:00:46.000Z",
                    commentReceiver: {
                      no: 1,
                      nickname: "1번 닉네임",
                    },
                    commentSender: {
                      no: 13,
                      nickname: "13번닉네임",
                    },
                    _count: {
                      reply: 3,
                    },
                  },
                  {
                    no: 2,
                    content: "Random content 1",
                    createdAt: "2024-07-01T05:00:46.000Z",
                    commentReceiver: {
                      no: 1,
                      nickname: "1번 닉네임",
                    },
                    commentSender: {
                      no: 5,
                      nickname: "5번닉네임",
                    },
                    _count: {
                      reply: 3,
                    },
                  },
                  {
                    no: 1,
                    content: "Hello world!",
                    createdAt: "2024-07-01T05:00:46.000Z",
                    commentReceiver: {
                      no: 1,
                      nickname: "1번 닉네임",
                    },
                    commentSender: {
                      no: 8,
                      nickname: "8번닉네임",
                    },
                    _count: {
                      reply: 7,
                    },
                  },
                ],
                meta: {
                  page: 1,
                  take: 10,
                  totalCount: 10,
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
  );
}
