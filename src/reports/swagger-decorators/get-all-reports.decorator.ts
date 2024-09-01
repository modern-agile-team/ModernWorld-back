import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiGetAllReports() {
  return applyDecorators(
    ApiOperation({
      summary: "신고 조회",
      description: "신고 내역 전부 조회 (Admin만 가능)",
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
                no: 14,
                sender: {
                  no: 12,
                  nickname: "12번닉네임",
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
                no: 13,
                sender: {
                  no: 11,
                  nickname: "11번닉네임",
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
                no: 12,
                sender: {
                  no: 11,
                  nickname: "11번닉네임",
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
            ],
            meta: {
              page: 1,
              take: 10,
              totalCount: 15,
              totalPage: 2,
            },
          },
        },
      },
    }),

    ApiBadRequestResponse({
      description: "query가 조건에 안맞는 경우",
      content: {
        JSON: {
          example: {
            message: [
              "category must be one of the following values: spam, harmfulContent, scamImpersonation, copyrightInfringement, explicitContent, abusiveBehavior, misinformation, duplicateContent, hateSpeech, technicalIssue, other",
              "page must be a positive number",
              "page must be an integer number",
              "take must be a positive number",
              "take must be an integer number",
              "orderBy must be one of the following values: asc, desc",
            ],
            error: "Bad Request",
            statusCode: 400,
          },
        },
      },
    }),

    ApiForbiddenResponse({
      description: "유저가 Admin이 아닌 경우",
      content: {
        JSON: {
          example: {
            message: "You are not admin.",
            error: "Forbidden",
            statusCode: 403,
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
