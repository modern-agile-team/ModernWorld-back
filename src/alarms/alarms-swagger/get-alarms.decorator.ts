import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
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
                no: 66,
                userNo: 31,
                title: "업적",
                content:
                  "업적 [선함]을 달성했습니다! 1000포인트를 흭득하셨습니다!",
                status: false,
                createdAt: "2024-08-11T06:49:34.000Z",
              },
              {
                no: 65,
                userNo: 31,
                title: "업적",
                content:
                  "업적 [부자는 아님]을 달성했습니다! 2000포인트를 흭득하셨습니다!",
                status: false,
                createdAt: "2024-08-11T06:45:35.000Z",
              },
              {
                no: 64,
                userNo: 31,
                title: "업적",
                content:
                  "업적 [부자는 아님]을 달성했습니다! 2000포인트를 흭득하셨습니다!",
                status: false,
                createdAt: "2024-08-11T06:31:46.000Z",
              },
              {
                no: 63,
                userNo: 31,
                title: "업적",
                content:
                  "업적 [커뮤 초보자]을 달성했습니다! 100포인트를 흭득하셨습니다!",
                status: false,
                createdAt: "2024-08-11T06:24:14.000Z",
              },
              {
                no: 61,
                userNo: 31,
                title: "업적",
                content:
                  "업적 [커뮤 초보자]을 달성했습니다! 100포인트를 흭득하셨습니다!",
                status: false,
                createdAt: "2024-08-09T08:05:47.000Z",
              },
              {
                no: 59,
                userNo: 31,
                title: "업적",
                content:
                  "업적 [커뮤 초보자]을 달성했습니다! 100포인트를 흭득하셨습니다!",
                status: false,
                createdAt: "2024-08-09T08:05:06.000Z",
              },
              {
                no: 57,
                userNo: 31,
                title: "업적",
                content:
                  "업적 [커뮤 초보자]을 달성했습니다! 100포인트를 흭득하셨습니다!",
                status: false,
                createdAt: "2024-08-09T08:04:01.000Z",
              },
              {
                no: 55,
                userNo: 31,
                title: "업적",
                content:
                  "업적 [커뮤 초보자]을 달성했습니다! 100포인트를 흭득하셨습니다!",
                status: false,
                createdAt: "2024-08-09T08:00:10.000Z",
              },
              {
                no: 53,
                userNo: 31,
                title: "업적",
                content:
                  "업적 [1]을 달성했습니다! 1000포인트를 흭득하셨습니다!",
                status: false,
                createdAt: "2024-08-09T07:56:14.000Z",
              },
              {
                no: 52,
                userNo: 31,
                title: "게임",
                content:
                  "[가위 바위 보 게임]에서 승리하셨습니다! 300포인트를 획득하셨습니다!",
                status: false,
                createdAt: "2024-08-09T07:56:14.000Z",
              },
            ],
            meta: {
              page: 1,
              take: 10,
              totalCount: 52,
              totalPage: 6,
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

    ApiBearerAuth("access-token"),
  );
}
