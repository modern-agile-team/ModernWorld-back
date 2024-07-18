import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiUpdateOneReply() {
  return applyDecorators(
    ApiOperation({ summary: "comment의 reply 수정" }),

    ApiOkResponse({
      description: "Success",
      content: {
        JSON: {
          example: {
            no: 4,
            commentNo: 2,
            userNo: 1,
            content: "왕덕봉",
            createdAt: "2024-07-01T05:00:46.000Z",
            deletedAt: null,
          },
        },
      },
    }),

    ApiBadRequestResponse({
      content: {
        JSON: {
          examples: {
            ex1: {
              summary: "body의 content가 1자 이상 100자 이하가 아닌 경우",
              value: {
                message: [
                  "content must be longer than or equal to 1 and shorter than or equal to 100 characters",
                ],
                error: "Bad Request",
                statusCode: 400,
              },
            },

            ex2: {
              summary: "param의 commentNo가 양의 정수가 아닌 경우",
              value: {
                message: "Validation failed (positive int string is expected)",
                error: "Bad Request",
                statusCode: 400,
              },
            },

            ex3: {
              summary: "param의 replyNo가 양의 정수가 아닌 경우",
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

    ApiForbiddenResponse({
      description: "유저 본인 걸 수정하려는게 아닌 경우",
      content: {
        JSON: {
          example: {
            message: "User can update only their reply.",
            error: "Forbidden",
            statusCode: 403,
          },
        },
      },
    }),

    ApiNotFoundResponse({
      content: {
        JSON: {
          examples: {
            ex1: {
              summary: "해당 번호의 commentNo가 존재하지 않는 경우",
              value: {
                message: "There is no comment with that number.",
                error: "Not Found",
                statusCode: 404,
              },
            },

            ex2: {
              summary: "해당 번호의 replyNo가 존재하지 않는 경우",
              value: {
                message: "There is no reply with that number.",
                error: "Not Found",
                statusCode: 404,
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
