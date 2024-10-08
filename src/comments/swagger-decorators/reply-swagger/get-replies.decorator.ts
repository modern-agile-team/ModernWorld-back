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

export function ApiGetRelies() {
  return applyDecorators(
    ApiOperation({ summary: "comment의 reply 조회" }),

    ApiOkResponse({
      description: "Success",
      content: {
        JSON: {
          example: {
            data: [
              {
                no: 26,
                commentNo: 98,
                content: "aaaatring",
                createdAt: "2024-08-11T10:55:37.000Z",
                user: {
                  no: 31,
                  nickname: "내이름",
                },
              },
              {
                no: 25,
                commentNo: 98,
                content: "aaaatring",
                createdAt: "2024-08-11T10:53:16.000Z",
                user: {
                  no: 31,
                  nickname: "내이름",
                },
              },
              {
                no: 24,
                commentNo: 98,
                content: "strinasdg",
                createdAt: "2024-08-11T10:52:35.000Z",
                user: {
                  no: 31,
                  nickname: "내이름",
                },
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
              summary: "param의 commentNo가 양의 정수가 아닌 경우",
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
