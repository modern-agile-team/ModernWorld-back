import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiGetNeighobor() {
  return applyDecorators(
    ApiOperation({
      summary: "neighbor 조회",
    }),
    ApiOkResponse({
      description: "Success",
      content: {
        JSON: {
          example: {
            data: [
              {
                no: 14,
                NeighborSenderNo: {
                  no: 1,
                  nickname: "1번닉네임",
                },
                NeighborReceiverNo: {
                  no: 3,
                  nickname: "3번닉네임",
                },
                createdAt: "2024-07-19T16:22:02.000Z",
                status: true,
              },
              {
                no: 10,
                NeighborSenderNo: {
                  no: 8,
                  nickname: "8번닉네임",
                },
                NeighborReceiverNo: {
                  no: 1,
                  nickname: "1번닉네임",
                },
                createdAt: "2024-07-16T19:55:27.000Z",
                status: true,
              },
              {
                no: 3,
                NeighborSenderNo: {
                  no: 1,
                  nickname: "1번닉네임",
                },
                NeighborReceiverNo: {
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
              totalCount: 3,
              totalPage: 1,
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
