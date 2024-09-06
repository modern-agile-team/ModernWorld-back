import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiDeleteOneReply() {
  return applyDecorators(
    ApiOperation({ summary: "comment의 reply 삭제" }),

    ApiNoContentResponse({ description: "Success" }),

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
      description: "유저 본인 걸 삭제하려는게 아닌 경우",
      content: {
        JSON: {
          example: {
            message: "User can delete only their reply.",
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

    ApiBearerAuth("access-token"),
  );
}
