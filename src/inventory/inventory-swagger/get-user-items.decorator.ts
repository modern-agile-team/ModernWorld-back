import { applyDecorators } from "@nestjs/common";
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiGetUserItems() {
  return applyDecorators(
    ApiOperation({
      summary: "유저의 갖고있는 아이템 조회",
      description: "유저가 가지고있는 아이템을 가져옵니다.",
    }),

    ApiOkResponse({
      description: "Success",
      content: {
        JSON: {
          example: [
            {
              no: 42,
              userNo: 3,
              itemNo: 42,
              createdAt: "2024-07-01T05:00:46.000Z",
              status: false,
              item: {
                no: 42,
                name: "42번 아이템",
                description: "42번 아이템 설명",
                image:
                  "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/yellowsofa.svg",
                theme: "봄 테마",
                type: "6번 타입",
                price: 100,
              },
            },
            {
              no: 43,
              userNo: 3,
              itemNo: 18,
              createdAt: "2024-07-01T05:00:46.000Z",
              status: false,
              item: {
                no: 18,
                name: "18번 아이템",
                description: "18번 아이템 설명",
                image:
                  "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/monitor.svg",
                theme: "여름 테마",
                type: "6번 타입",
                price: 100,
              },
            },
            {
              no: 44,
              userNo: 3,
              itemNo: 29,
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
              no: 45,
              userNo: 3,
              itemNo: 3,
              createdAt: "2024-07-01T05:00:46.000Z",
              status: false,
              item: {
                no: 3,
                name: "3번 아이템",
                description: "3번 아이템 설명",
                image:
                  "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/beardoll.svg",
                theme: "봄 테마",
                type: "3번 타입",
                price: 100,
              },
            },
            {
              no: 46,
              userNo: 3,
              itemNo: 45,
              createdAt: "2024-07-01T05:00:46.000Z",
              status: false,
              item: {
                no: 45,
                name: "45번 아이템",
                description: "45번 아이템 설명",
                image:
                  "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/grandfatherclock.svg",
                theme: "봄 테마",
                type: "9번 타입",
                price: 100,
              },
            },
          ],
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
