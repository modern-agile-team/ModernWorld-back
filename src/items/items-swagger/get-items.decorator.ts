import { applyDecorators } from "@nestjs/common";
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiGetItems() {
  return applyDecorators(
    ApiOperation({
      summary: "아이템 가져오기",
      description: "아이템만 가져옵니다.",
    }),
    ApiOkResponse({
      description: "Success",
      content: {
        JSON: {
          example: [
            {
              no: 1,
              name: "1번 아이템",
              image:
                "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/grandfatherclock.svg",
            },
            {
              no: 2,
              name: "2번 아이템",
              image:
                "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/pinkrug.svg",
            },
            {
              no: 3,
              name: "3번 아이템",
              image:
                "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/beardoll.svg",
            },
            {
              no: 4,
              name: "4번 아이템",
              image:
                "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/monitor.svg",
            },
            {
              no: 5,
              name: "5번 아이템",
              image:
                "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/yellowsofa.svg",
            },
            {
              no: 6,
              name: "6번 아이템",
              image:
                "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/bluerug.svg",
            },
            {
              no: 7,
              name: "7번 아이템",
              image:
                "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/window.svg",
            },
            {
              no: 8,
              name: "8번 아이템",
              image:
                "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/monalisa.svg",
            },
            {
              no: 9,
              name: "9번 아이템",
              image:
                "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/table.svg",
            },
            {
              no: 10,
              name: "10번 아이템",
              image:
                "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/woodchair.svg",
            },
            {
              no: 11,
              name: "11번 아이템",
              image:
                "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/beardoll.svg",
            },
            {
              no: 12,
              name: "12번 아이템",
              image:
                "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/pinkrug.svg",
            },
            {
              no: 13,
              name: "13번 아이템",
              image:
                "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/monitor.svg",
            },
            {
              no: 14,
              name: "14번 아이템",
              image:
                "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/window.svg",
            },
            {
              no: 15,
              name: "15번 아이템",
              image:
                "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/woodchair.svg",
            },
            {
              no: 16,
              name: "16번 아이템",
              image:
                "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/yellowsofa.svg",
            },
            {
              no: 17,
              name: "17번 아이템",
              image:
                "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/monalisa.svg",
            },
            {
              no: 18,
              name: "18번 아이템",
              image:
                "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/monitor.svg",
            },
            {
              no: 19,
              name: "19번 아이템",
              image:
                "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/table.svg",
            },
            {
              no: 20,
              name: "20번 아이템",
              image:
                "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/woodchair.svg",
            },
            {
              no: 21,
              name: "21번 아이템",
              image:
                "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/bluerug.svg",
            },
            {
              no: 22,
              name: "22번 아이템",
              image:
                "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/grandfatherclock.svg",
            },
            {
              no: 23,
              name: "23번 아이템",
              image:
                "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/window.svg",
            },
            {
              no: 24,
              name: "24번 아이템",
              image:
                "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/monalisa.svg",
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
