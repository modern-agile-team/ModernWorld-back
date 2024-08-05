import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
} from "@nestjs/swagger";

export function ApiGetRSPRecords() {
  return applyDecorators(
    ApiOkResponse({
      description: "가위 바위 보 기록",
      content: {
        JSON: {
          example: {
            data: [
              {
                no: 31,
                userNo: 31,
                userChoice: "Scissors",
                computerChoice: "Scissors",
                result: "draw",
                createdAt: "2024-08-03T09:12:54.000Z",
              },
              {
                no: 30,
                userNo: 31,
                userChoice: "Scissors",
                computerChoice: "Scissors",
                result: "draw",
                createdAt: "2024-08-03T09:05:54.000Z",
              },
              {
                no: 29,
                userNo: 31,
                userChoice: "Scissors",
                computerChoice: "Rock",
                result: "lose",
                createdAt: "2024-08-03T09:05:54.000Z",
              },
              {
                no: 28,
                userNo: 31,
                userChoice: "Scissors",
                computerChoice: "Rock",
                result: "lose",
                createdAt: "2024-08-03T09:05:51.000Z",
              },
              {
                no: 27,
                userNo: 31,
                userChoice: "Scissors",
                computerChoice: "Paper",
                result: "win",
                createdAt: "2024-08-03T09:05:27.000Z",
              },
              {
                no: 26,
                userNo: 31,
                userChoice: "Scissors",
                computerChoice: "Paper",
                result: "win",
                createdAt: "2024-08-03T09:05:27.000Z",
              },
              {
                no: 25,
                userNo: 31,
                userChoice: "Scissors",
                computerChoice: "Paper",
                result: "win",
                createdAt: "2024-08-03T09:05:26.000Z",
              },
              {
                no: 24,
                userNo: 31,
                userChoice: "Scissors",
                computerChoice: "Paper",
                result: "win",
                createdAt: "2024-08-03T09:05:25.000Z",
              },
              {
                no: 23,
                userNo: 31,
                userChoice: "Scissors",
                computerChoice: "Rock",
                result: "lose",
                createdAt: "2024-08-03T09:05:24.000Z",
              },
              {
                no: 22,
                userNo: 31,
                userChoice: "Scissors",
                computerChoice: "Paper",
                result: "win",
                createdAt: "2024-08-03T09:05:05.000Z",
              },
            ],
            meta: {
              page: 1,
              take: 10,
              totalCount: 31,
              totalPage: 4,
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

            ex5: {
              summary: "param의 userNo가 양의 정수가 아닐 경우",
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

    ApiBearerAuth("access-token"),
  );
}
