import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiGetUserPresents() {
  return applyDecorators(
    ApiOperation({
      summary: "유저의 선물 불러오기",
    }),

    ApiOkResponse({
      description: "Success",
      content: {
        JSON: {
          example: [
            {
              no: 12,
              status: "unread",
              createdAt: "2024-07-12T07:01:51.000Z",
              item: {
                name: "1번 아이템",
              },
              userPresentSenderNo: {
                no: 1,
                nickname: "1번 닉네임",
              },
              userPresentReceiverNo: {
                no: 2,
                nickname: "2번닉네임",
              },
            },
            {
              no: 11,
              status: "unread",
              createdAt: "2024-07-12T06:39:29.000Z",
              item: {
                name: "1번 아이템",
              },
              userPresentSenderNo: {
                no: 1,
                nickname: "1번 닉네임",
              },
              userPresentReceiverNo: {
                no: 2,
                nickname: "2번닉네임",
              },
            },
            {
              no: 10,
              status: "unread",
              createdAt: "2024-07-12T06:19:41.000Z",
              item: {
                name: "4번 아이템",
              },
              userPresentSenderNo: {
                no: 1,
                nickname: "1번 닉네임",
              },
              userPresentReceiverNo: {
                no: 3,
                nickname: "3번닉네임",
              },
            },
            {
              no: 9,
              status: "unread",
              createdAt: "2024-07-01T05:00:46.000Z",
              item: {
                name: "3번 아이템",
              },
              userPresentSenderNo: {
                no: 4,
                nickname: "4번닉네임",
              },
              userPresentReceiverNo: {
                no: 5,
                nickname: "5번닉네임",
              },
            },
            {
              no: 8,
              status: "unread",
              createdAt: "2024-07-01T05:00:46.000Z",
              item: {
                name: "2번 아이템",
              },
              userPresentSenderNo: {
                no: 3,
                nickname: "3번닉네임",
              },
              userPresentReceiverNo: {
                no: 4,
                nickname: "4번닉네임",
              },
            },
            {
              no: 7,
              status: "unread",
              createdAt: "2024-07-01T05:00:46.000Z",
              item: {
                name: "1번 아이템",
              },
              userPresentSenderNo: {
                no: 5,
                nickname: "5번닉네임",
              },
              userPresentReceiverNo: {
                no: 4,
                nickname: "4번닉네임",
              },
            },
            {
              no: 6,
              status: "unread",
              createdAt: "2024-07-01T05:00:46.000Z",
              item: {
                name: "4번 아이템",
              },
              userPresentSenderNo: {
                no: 1,
                nickname: "1번 닉네임",
              },
              userPresentReceiverNo: {
                no: 3,
                nickname: "3번닉네임",
              },
            },
            {
              no: 5,
              status: "read",
              createdAt: "2024-07-01T05:00:46.000Z",
              item: {
                name: "3번 아이템",
              },
              userPresentSenderNo: {
                no: 4,
                nickname: "4번닉네임",
              },
              userPresentReceiverNo: {
                no: 1,
                nickname: "1번 닉네임",
              },
            },
            {
              no: 4,
              status: "unread",
              createdAt: "2024-07-01T05:00:46.000Z",
              item: {
                name: "2번 아이템",
              },
              userPresentSenderNo: {
                no: 3,
                nickname: "3번닉네임",
              },
              userPresentReceiverNo: {
                no: 1,
                nickname: "1번 닉네임",
              },
            },
            {
              no: 3,
              status: "read",
              createdAt: "2024-07-01T05:00:46.000Z",
              item: {
                name: "1번 아이템",
              },
              userPresentSenderNo: {
                no: 2,
                nickname: "2번닉네임",
              },
              userPresentReceiverNo: {
                no: 1,
                nickname: "1번 닉네임",
              },
            },
            {
              no: 2,
              status: "unread",
              createdAt: "2024-07-01T05:00:46.000Z",
              item: {
                name: "1번 아이템",
              },
              userPresentSenderNo: {
                no: 5,
                nickname: "5번닉네임",
              },
              userPresentReceiverNo: {
                no: 1,
                nickname: "1번 닉네임",
              },
            },
            {
              no: 1,
              status: "unread",
              createdAt: "2024-07-01T05:00:46.000Z",
              item: {
                name: "1번 아이템",
              },
              userPresentSenderNo: {
                no: 1,
                nickname: "1번 닉네임",
              },
              userPresentReceiverNo: {
                no: 2,
                nickname: "2번닉네임",
              },
            },
          ],
        },
      },
    }),

    ApiBadRequestResponse({
      description: "query의 type이 enum에 해당하지 않는 경우",
      content: {
        JSON: {
          example: {
            message: [
              "type must be one of the following values: senderNo, receiverNo",
            ],
            error: "Bad Request",
            statusCode: 400,
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
