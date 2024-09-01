import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiGetUserReports() {
  return applyDecorators(
    ApiOperation({
      summary: "유저 신고내역 조회",
      description: "유저 본인이 신고한 내역을 조회합니다.",
    }),

    ApiCreatedResponse({
      description: "Success",
      content: {
        JSON: {
          example: {
            data: [
              {
                no: 18,
                sender: {
                  no: 31,
                  nickname: "엄준식",
                },
                receiver: {
                  no: 11,
                  nickname: "11번닉네임",
                },
                content: "string",
                createdAt: "2024-08-30T12:34:51.000Z",
                category: "other",
              },
              {
                no: 17,
                sender: {
                  no: 31,
                  nickname: "엄준식",
                },
                receiver: {
                  no: 11,
                  nickname: "11번닉네임",
                },
                content: "string",
                createdAt: "2024-08-30T12:34:51.000Z",
                category: "other",
              },
              {
                no: 16,
                sender: {
                  no: 31,
                  nickname: "엄준식",
                },
                receiver: {
                  no: 11,
                  nickname: "11번닉네임",
                },
                content: "string",
                createdAt: "2024-08-30T12:34:50.000Z",
                category: "other",
              },
              {
                no: 15,
                sender: {
                  no: 31,
                  nickname: "엄준식",
                },
                receiver: {
                  no: 11,
                  nickname: "11번닉네임",
                },
                content: "string",
                createdAt: "2024-08-30T12:34:50.000Z",
                category: "other",
              },
              {
                no: 11,
                sender: {
                  no: 31,
                  nickname: "엄준식",
                },
                receiver: {
                  no: 11,
                  nickname: "11번닉네임",
                },
                content: "string",
                createdAt: "2024-08-30T12:34:49.000Z",
                category: "other",
              },
              {
                no: 10,
                sender: {
                  no: 31,
                  nickname: "엄준식",
                },
                receiver: {
                  no: 3,
                  nickname: "3번닉네임",
                },
                content: "string",
                createdAt: "2024-08-30T12:34:43.000Z",
                category: "other",
              },
              {
                no: 9,
                sender: {
                  no: 31,
                  nickname: "엄준식",
                },
                receiver: {
                  no: 3,
                  nickname: "3번닉네임",
                },
                content: "string",
                createdAt: "2024-08-30T12:34:42.000Z",
                category: "other",
              },
              {
                no: 8,
                sender: {
                  no: 31,
                  nickname: "엄준식",
                },
                receiver: {
                  no: 3,
                  nickname: "3번닉네임",
                },
                content: "string",
                createdAt: "2024-08-30T12:34:42.000Z",
                category: "other",
              },
              {
                no: 7,
                sender: {
                  no: 31,
                  nickname: "엄준식",
                },
                receiver: {
                  no: 3,
                  nickname: "3번닉네임",
                },
                content: "string",
                createdAt: "2024-08-30T12:34:42.000Z",
                category: "other",
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
