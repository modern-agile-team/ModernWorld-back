import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiGetOneReply() {
  return applyDecorators(
    ApiOperation({ summary: "reply 하나 조회" }),

    ApiOkResponse({
      description: "Success",
      content: {
        JSON: {
          example: {
            no: 22,
            commentNo: 1,
            content: "string",
            createdAt: "2024-08-09T08:09:46.000Z",
            user: {
              no: 31,
              nickname: "엄준식",
            },
          },
        },
      },
    }),

    ApiBadRequestResponse({
      description: "Param is not positive int",
      content: {
        JSON: {
          example: {
            message: "Validation failed (positive int string is expected)",
            error: "Bad Request",
            statusCode: 400,
          },
        },
      },
    }),

    ApiNotFoundResponse({
      content: {
        JSON: {
          examples: {
            ex1: {
              summary: "comment가 삭제됐거나 존재하지 않는 경우",
              value: {
                message: "There is no comment with that number.",
                error: "Not Found",
                statusCode: 404,
              },
            },

            ex2: {
              summary: "reply가 삭제됐거나 존재하지 않는 경우",
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
