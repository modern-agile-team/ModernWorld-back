import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiGetPosts() {
  return applyDecorators(
    ApiOperation({
      summary: "쪽지 조회",
      description: "유저의 쪽지를 조회합니다.",
    }),

    ApiOkResponse({
      description: "Success",
      content: {
        JSON: {
          example: [
            {
              no: 1,
              content: "엄준식비",
              createdAt: "2024-07-01T05:00:46.000Z",
              check: false,
              userPostSenderNo: {
                no: 1,
                nickname: "1번 닉네임",
              },
              userPostReceiverNo: {
                no: 2,
                nickname: "2번닉네임",
              },
            },
            {
              no: 3,
              content: "엄준식수",
              createdAt: "2024-07-01T05:00:46.000Z",
              check: false,
              userPostSenderNo: {
                no: 1,
                nickname: "1번 닉네임",
              },
              userPostReceiverNo: {
                no: 4,
                nickname: "4번닉네임",
              },
            },
            {
              no: 4,
              content: "엄준식기",
              createdAt: "2024-07-01T05:00:46.000Z",
              check: false,
              userPostSenderNo: {
                no: 1,
                nickname: "1번 닉네임",
              },
              userPostReceiverNo: {
                no: 5,
                nickname: "5번닉네임",
              },
            },
            {
              no: 5,
              content: "왕덕봉봉",
              createdAt: "2024-07-01T05:00:46.000Z",
              check: false,
              userPostSenderNo: {
                no: 2,
                nickname: "2번닉네임",
              },
              userPostReceiverNo: {
                no: 1,
                nickname: "1번 닉네임",
              },
            },
            {
              no: 6,
              content: "왕덕봉덕",
              createdAt: "2024-07-01T05:00:46.000Z",
              check: true,
              userPostSenderNo: {
                no: 3,
                nickname: "3번닉네임",
              },
              userPostReceiverNo: {
                no: 1,
                nickname: "1번 닉네임",
              },
            },
            {
              no: 7,
              content: "왕닭발",
              createdAt: "2024-07-01T05:00:46.000Z",
              check: false,
              userPostSenderNo: {
                no: 4,
                nickname: "4번닉네임",
              },
              userPostReceiverNo: {
                no: 1,
                nickname: "1번 닉네임",
              },
            },
            {
              no: 8,
              content: "김뿡우",
              createdAt: "2024-07-14T11:50:55.000Z",
              check: false,
              userPostSenderNo: {
                no: 1,
                nickname: "1번 닉네임",
              },
              userPostReceiverNo: {
                no: 2,
                nickname: "2번닉네임",
              },
            },
          ],
        },
      },
    }),

    ApiBadRequestResponse({
      description: "query의 type이 enum에 맞지 않은경우",
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

    ApiBearerAuth("access-token"),
  );
}
