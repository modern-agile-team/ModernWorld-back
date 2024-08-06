import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiGetRSPRecords() {
  return applyDecorators(
    ApiOperation({ summary: "가위바위보 기록 조회" }),

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
      description: "query의 날짜의 형식이 알맞지 않은 경우",
      content: {
        JSON: {
          example: {
            message: ["date must be a Date instance"],
            error: "Bad Request",
            statusCode: 400,
          },
        },
      },
    }),

    ApiBearerAuth("access-token"),
  );
}
