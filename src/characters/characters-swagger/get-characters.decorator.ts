import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiGetCharacters() {
  return applyDecorators(
    ApiOperation({
      summary: "캐릭터 불러오기",
      description: "유저가 보유한 것과 상관없이 캐릭터만 불러옵니다.",
    }),
    ApiOkResponse({
      description: "Success",
      content: {
        JSON: {
          example: [
            {
              no: 1,
              image: "1번 cat 이미지",
              name: "1번 cat 이름",
            },
            {
              no: 2,
              image: "2번 dog 이미지",
              name: "2번 dog 이름",
            },
            {
              no: 3,
              image: "3번 cat 이미지",
              name: "3번 cat 이름",
            },
            {
              no: 4,
              image: "4번 dog 이미지",
              name: "4번 dog 이름",
            },
            {
              no: 5,
              image: "5번 dog 이미지",
              name: "5번 dog 이름",
            },
            {
              no: 6,
              image: "6번 dog 이미지",
              name: "6번 dog 이름",
            },
            {
              no: 7,
              image: "7번 dog 이미지",
              name: "7번 dog 이름",
            },
            {
              no: 8,
              image: "8번 dog 이미지",
              name: "8번 dog 이름",
            },
            {
              no: 9,
              image: "9번 dog 이미지",
              name: "9번 dog 이름",
            },
            {
              no: 10,
              image: "10번 dog 이미지",
              name: "10번 dog 이름",
            },
            {
              no: 11,
              image: "11번 cat 이미지",
              name: "11번 cat 이름",
            },
            {
              no: 12,
              image: "12번 dog 이미지",
              name: "12번 dog 이름",
            },
          ],
        },
      },
    }),
    ApiBadRequestResponse({
      description: "Animal Enum에 해당하지 않은 값을 넣었을 때",

      content: {
        JSON: {
          example: {
            message: ["species must be one of the following values: cat, dog"],
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
