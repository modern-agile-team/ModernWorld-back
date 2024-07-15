import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from "@nestjs/swagger";

export function ApiGetUserItems() {
  return applyDecorators(
    ApiOperation({
      summary: "유저의 갖고있는 아이템 조회",
      description: "유저가 가지고있는 아이템을 가져옵니다.",
    }),

    ApiParam({ name: "userNo", example: 1 }),

    ApiOkResponse({
      description: "Success",
      content: {
        JSON: {
          example: [
            {
              no: 28,
              userNo: 1,
              createdAt: "2024-07-01T05:00:46.000Z",
              status: false,
              item: {
                no: 28,
                name: "28번 아이템",
                description: "28번 아이템 설명",
                image:
                  "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/grandfatherclock.svg",
                theme: "가을 테마",
                type: "4번 타입",
                price: 100,
              },
            },
            {
              no: 29,
              userNo: 1,
              createdAt: "2024-07-01T05:00:46.000Z",
              status: false,
              item: {
                no: 29,
                name: "29번 아이템",
                description: "29번 아이템 설명",
                image:
                  "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/monalisa.svg",
                theme: "가을 테마",
                type: "5번 타입",
                price: 100,
              },
            },
            {
              no: 30,
              userNo: 1,
              createdAt: "2024-07-01T05:00:46.000Z",
              status: false,
              item: {
                no: 30,
                name: "30번 아이템",
                description: "30번 아이템 설명",
                image:
                  "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/table.svg",
                theme: "가을 테마",
                type: "6번 타입",
                price: 100,
              },
            },
            {
              no: 31,
              userNo: 1,
              createdAt: "2024-07-01T05:00:46.000Z",
              status: false,
              item: {
                no: 31,
                name: "31번 아이템",
                description: "31번 아이템 설명",
                image:
                  "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/window.svg",
                theme: "가을 테마",
                type: "7번 타입",
                price: 100,
              },
            },
            {
              no: 32,
              userNo: 1,
              createdAt: "2024-07-01T05:00:46.000Z",
              status: false,
              item: {
                no: 32,
                name: "32번 아이템",
                description: "32번 아이템 설명",
                image:
                  "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/yellowsofa.svg",
                theme: "가을 테마",
                type: "8번 타입",
                price: 100,
              },
            },
            {
              no: 33,
              userNo: 1,
              createdAt: "2024-07-01T05:00:46.000Z",
              status: true,
              item: {
                no: 33,
                name: "33번 아이템",
                description: "33번 아이템 설명",
                image:
                  "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/woodchair.svg",
                theme: "가을 테마",
                type: "9번 타입",
                price: 100,
              },
            },
            {
              no: 34,
              userNo: 1,
              createdAt: "2024-07-01T05:00:46.000Z",
              status: false,
              item: {
                no: 34,
                name: "34번 아이템",
                description: "34번 아이템 설명",
                image:
                  "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/pinkrug.svg",
                theme: "가을 테마",
                type: "10번 타입",
                price: 100,
              },
            },
            {
              no: 35,
              userNo: 1,
              createdAt: "2024-07-01T05:00:46.000Z",
              status: false,
              item: {
                no: 35,
                name: "35번 아이템",
                description: "35번 아이템 설명",
                image:
                  "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/table.svg",
                theme: "가을 테마",
                type: "11번 타입",
                price: 100,
              },
            },
            {
              no: 36,
              userNo: 1,
              createdAt: "2024-07-01T05:00:46.000Z",
              status: false,
              item: {
                no: 36,
                name: "36번 아이템",
                description: "36번 아이템 설명",
                image:
                  "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/monitor.svg",
                theme: "가을 테마",
                type: "12번 타입",
                price: 100,
              },
            },
            {
              no: 183,
              userNo: 1,
              createdAt: "2024-07-08T07:33:04.000Z",
              status: false,
              item: {
                no: 12,
                name: "12번 아이템",
                description: "12번 아이템 설명",
                image:
                  "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/pinkrug.svg",
                theme: "봄 테마",
                type: "12번 타입",
                price: 100,
              },
            },
            {
              no: 184,
              userNo: 1,
              createdAt: "2024-07-08T07:34:15.000Z",
              status: false,
              item: {
                no: 11,
                name: "11번 아이템",
                description: "11번 아이템 설명",
                image:
                  "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/beardoll.svg",
                theme: "봄 테마",
                type: "11번 타입",
                price: 100,
              },
            },
            {
              no: 185,
              userNo: 1,
              createdAt: "2024-07-08T07:34:48.000Z",
              status: false,
              item: {
                no: 13,
                name: "13번 아이템",
                description: "13번 아이템 설명",
                image:
                  "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/monitor.svg",
                theme: "여름 테마",
                type: "1번 타입",
                price: 100,
              },
            },
            {
              no: 186,
              userNo: 1,
              createdAt: "2024-07-12T11:24:08.000Z",
              status: false,
              item: {
                no: 1,
                name: "1번 아이템",
                description: "1번 아이템 설명",
                image:
                  "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/grandfatherclock.svg",
                theme: "봄 테마",
                type: "1번 타입",
                price: 100,
              },
            },
          ],
        },
      },
    }),

    ApiBadRequestResponse({
      content: {
        JSON: {
          examples: {
            ex1: {
              summary: "pararm의 userNo가 양의 정수가 아닐때",
              value: {
                message: "Validation failed (positive int string is expected)",
                error: "Bad Request",
                statusCode: 400,
              },
            },

            ex2: {
              summary: "query의 status가 booelean 형태가 아닌 경우",
              value: {
                message: "Invalid boolean value.",
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
