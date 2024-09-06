import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiGetOneComment() {
  return applyDecorators(
    ApiOperation({ summary: "comment 하나 조회" }),

    ApiOkResponse({
      description: "Success",
      content: {
        JSON: {
          example: {
            no: 31,
            content: "Hello text",
            createdAt: "2024-08-02T01:44:32.000Z",
            commentReceiver: {
              no: 6,
              nickname: "6번닉네임",
            },
            commentSender: {
              no: 9,
              nickname: "9번닉네임",
            },
            _count: {
              reply: 0,
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
      description: "댓글이 삭제됐거나 존재하지 않는 경우",
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
