import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiGetOneItem() {
  return applyDecorators(
    ApiOperation({
      summary: "특정 아이템 가져오기",
      description: "특정 아이템만 가져옵니다.",
    }),
    ApiOkResponse({
      description: "Success",
      content: {
        JSON: {
          example: {
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
      },
    }),
    ApiBadRequestResponse({
      description: "itemNo가 정수값이 아닐 경우",
      content: {
        JSON: {
          example: {
            message: "Validation failed (numeric string is expected)",
            error: "Bad Request",
            statusCode: 400,
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
