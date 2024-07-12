import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from "@nestjs/swagger";

export function ApiGetUserCharacters() {
  return applyDecorators(
    ApiOperation({
      summary: "유저의 캐릭터 불러오기",
      description: "유저가 보유한 캐릭터만 불러옵니다.",
    }),
    ApiParam({
      name: "userNo",
      example: 1,
    }),
    ApiOkResponse({
      description: "Success",
      content: {
        JSON: {
          example: [
            [
              {
                no: 1,
                characterNo: 1,
                userNo: 1,
                status: true,
                character: {
                  name: "1번 cat 이름",
                  description: "1번 cat 설명",
                  image: "1번 cat 이미지",
                  species: "cat",
                  price: 100,
                },
              },
              {
                no: 2,
                characterNo: 2,
                userNo: 1,
                status: false,
                character: {
                  name: "2번 dog 이름",
                  description: "2번 dog 설명",
                  image: "2번 dog 이미지",
                  species: "dog",
                  price: 100,
                },
              },
              {
                no: 3,
                characterNo: 3,
                userNo: 1,
                status: false,
                character: {
                  name: "3번 cat 이름",
                  description: "3번 cat 설명",
                  image: "3번 cat 이미지",
                  species: "cat",
                  price: 100,
                },
              },
              {
                no: 4,
                characterNo: 4,
                userNo: 1,
                status: false,
                character: {
                  name: "4번 dog 이름",
                  description: "4번 dog 설명",
                  image: "4번 dog 이미지",
                  species: "dog",
                  price: 100,
                },
              },
              {
                no: 5,
                characterNo: 5,
                userNo: 1,
                status: false,
                character: {
                  name: "5번 dog 이름",
                  description: "5번 dog 설명",
                  image: "5번 dog 이미지",
                  species: "dog",
                  price: 100,
                },
              },
              {
                no: 6,
                characterNo: 6,
                userNo: 1,
                status: false,
                character: {
                  name: "6번 dog 이름",
                  description: "6번 dog 설명",
                  image: "6번 dog 이미지",
                  species: "dog",
                  price: 100,
                },
              },
              {
                no: 7,
                characterNo: 7,
                userNo: 1,
                status: false,
                character: {
                  name: "7번 dog 이름",
                  description: "7번 dog 설명",
                  image: "7번 dog 이미지",
                  species: "dog",
                  price: 100,
                },
              },
              {
                no: 8,
                characterNo: 8,
                userNo: 1,
                status: false,
                character: {
                  name: "8번 dog 이름",
                  description: "8번 dog 설명",
                  image: "8번 dog 이미지",
                  species: "dog",
                  price: 100,
                },
              },
              {
                no: 9,
                characterNo: 9,
                userNo: 1,
                status: false,
                character: {
                  name: "9번 dog 이름",
                  description: "9번 dog 설명",
                  image: "9번 dog 이미지",
                  species: "dog",
                  price: 100,
                },
              },
              {
                no: 10,
                characterNo: 10,
                userNo: 1,
                status: false,
                character: {
                  name: "10번 dog 이름",
                  description: "10번 dog 설명",
                  image: "10번 dog 이미지",
                  species: "dog",
                  price: 100,
                },
              },
              {
                no: 11,
                characterNo: 11,
                userNo: 1,
                status: false,
                character: {
                  name: "11번 cat 이름",
                  description: "11번 cat 설명",
                  image: "11번 cat 이미지",
                  species: "cat",
                  price: 100,
                },
              },
              {
                no: 12,
                characterNo: 12,
                userNo: 1,
                status: false,
                character: {
                  name: "12번 dog 이름",
                  description: "12번 dog 설명",
                  image: "12번 dog 이미지",
                  species: "dog",
                  price: 100,
                },
              },
            ],
          ],
        },
      },
    }),

    ApiBadRequestResponse({
      content: {
        JSON: {
          examples: {
            ex1: {
              summary: "parma의 usermNo가 수가 아닐때",
              value: {
                message: "Validation failed (numeric string is expected)",
                error: "Bad Request",
                statusCode: 400,
              },
            },
            ex2: {
              summary: "query의 statuts가 boolean이 아닐때",
              value: {
                message: "Invalid boolean value.",
                error: "Bad Request",
                statusCode: 400,
              },
            },
            ex3: {
              summary: "query의 species가 Animal enum이 아닐 때",
              value: {
                message: [
                  "species must be one of the following values: cat, dog",
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
