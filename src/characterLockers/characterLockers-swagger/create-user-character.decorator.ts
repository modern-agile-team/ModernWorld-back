import { applyDecorators } from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiCreateUserOneCharacter() {
  return applyDecorators(
    ApiOperation({
      summary: "유저의 캐릭터 생성(구매)",
      description: `유저의 캐릭터를 생성합니다.
      \n유저가 캐릭터가 없다면 캐릭터 1 ~ 4번 중 하나의 캐릭터는 공짜로 얻을 수 있습니다.
      \n처음 생성하는 경우에는 바로 사용까지 합니다.`,
    }),
    ApiCreatedResponse({
      description: "생성(구매)",
      content: {
        JSON: {
          examples: {
            ex1: {
              summary: "구매한 경우",
              value: { no: 127, characterNo: 12, userNo: 1, status: false },
            },
            ex2: {
              summary: "뉴비가 캐릭터를 얻은 경우",
              value: {
                no: 143,
                characterNo: 1,
                userNo: 20,
                status: true,
              },
            },
          },
        },
      },
    }),

    ApiForbiddenResponse({
      content: {
        JSON: {
          examples: {
            ex1: {
              summary: "뉴비가 캐릭터를 선택했는데 캐릭터 번호가 5이상인경우",
              value: {
                message:
                  "Newbies can only select characters that are 4 or less.",
                error: "Forbidden",
                statusCode: 403,
              },
            },
            ex2: {
              summary: "포인트가 부족하면",
              value: {
                message: "User doesn't have enough point.",
                error: "Forbidden",
                statusCode: 403,
              },
            },
          },
        },
      },
    }),

    ApiNotFoundResponse({
      description: "해당번호의 캐릭터가 존재하지 않을 경우",
      content: {
        JSON: {
          example: {
            message: "There is no such character.",
            error: "Not Found",
            statusCode: 404,
          },
        },
      },
    }),

    ApiConflictResponse({
      description: "해당번호의 캐릭터가 이미 존재하는 경우",
      content: {
        JSON: {
          example: {
            message: "User already has this character",
            error: "Conflict",
            statusCode: 409,
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
