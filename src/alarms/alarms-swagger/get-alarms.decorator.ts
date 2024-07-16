import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiGetAlarms() {
  return applyDecorators(
    ApiOperation({
      summary: "알람 조회",
    }),

    ApiOkResponse({
      description: "Success",
      content: {
        JSON: {
          example: {
            data: [
              {
                no: 18,
                userNo: 1,
                content: "1",
                status: true,
                createdAt: "2024-07-01T17:39:44.000Z",
                url: "1",
              },
              {
                no: 17,
                userNo: 1,
                content: "1",
                status: true,
                createdAt: "2024-07-01T17:39:44.000Z",
                url: "1",
              },
              {
                no: 16,
                userNo: 1,
                content: "1",
                status: true,
                createdAt: "2024-07-01T17:39:44.000Z",
                url: "1",
              },
              {
                no: 15,
                userNo: 1,
                content: "1",
                status: true,
                createdAt: "2024-07-01T17:39:44.000Z",
                url: "1",
              },
              {
                no: 14,
                userNo: 1,
                content: "1",
                status: true,
                createdAt: "2024-07-01T17:39:44.000Z",
                url: "1",
              },
              {
                no: 13,
                userNo: 1,
                content: "1",
                status: true,
                createdAt: "2024-07-01T17:39:44.000Z",
                url: "1",
              },
              {
                no: 12,
                userNo: 1,
                content: "1",
                status: true,
                createdAt: "2024-07-01T17:39:44.000Z",
                url: "1",
              },
              {
                no: 11,
                userNo: 1,
                content: "1",
                status: true,
                createdAt: "2024-07-01T17:39:44.000Z",
                url: "1",
              },
              {
                no: 10,
                userNo: 1,
                content: "1",
                status: true,
                createdAt: "2024-07-01T17:39:44.000Z",
                url: "1",
              },
              {
                no: 9,
                userNo: 1,
                content: "1",
                status: true,
                createdAt: "2024-07-01T17:39:44.000Z",
                url: "1",
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
      content: {
        JSON: {
          examples: {
            ex1: {
              summary: "page가 양의 정수가 아닐 경우",
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
              summary: "take가 양의 정수가 아닐 경우",
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
              summary: "orderBy가 asc, desc 중 하나가 아닐 경우",
              value: {
                message: [
                  "orderBy must be one of the following values: asc, desc",
                ],
                error: "Bad Request",
                statusCode: 400,
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
