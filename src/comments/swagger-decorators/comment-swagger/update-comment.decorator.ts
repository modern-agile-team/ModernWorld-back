import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiUpdateComment() {
  return applyDecorators(
    ApiOperation({ summary: "comment 수정" }),

    ApiOkResponse({
      description: "Success",
      content: {
        JSON: {
          example: {
            no: 98,
            content: "stringaaaa",
            createdAt: "2024-08-11T10:48:10.000Z",
            commentReceiver: {
              no: 3,
              nickname: "3번닉네임",
            },
            commentSender: {
              no: 31,
              nickname: "내이름",
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
              summary: "param의 commentNo가 양의 정수가 아닌 경우",
              value: {
                message: "Validation failed (positive int string is expected)",
                error: "Bad Request",
                statusCode: 400,
              },
            },

            ex2: {
              summary: "body의 content가 1자 이상 100자 이하가 아닌 경우",
              value: {
                message: [
                  "content must be longer than or equal to 1 and shorter than or equal to 100 characters",
                ],
                error: "Bad Request",
                statusCode: 400,
              },
            },
          },
        },
      },
    }),

    ApiForbiddenResponse({
      description: "본인의 comment가 아닌 경우",
      content: {
        JSON: {
          example: {
            message: "User can update only their comment.",
            error: "Forbidden",
            statusCode: 403,
          },
        },
      },
    }),

    ApiNotFoundResponse({
      description: "해당 번호의 comment가 존재하지 않는 경우",
      content: {
        JSON: {
          example: {
            message: "There is no comment with that number.",
            error: "Not Found",
            statusCode: 404,
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
