import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiCreateUserNickname() {
  return applyDecorators(
    ApiOperation({
      summary: "유저 닉네임 생성 API",
      description: "닉네임 생성용 api입니다.",
    }),

    ApiCreatedResponse({
      description: "성공",
      content: {
        JSON: {
          example: {
            no: 1,
            nickname: "악질닉네임",
          },
        },
      },
    }),

    ApiBadRequestResponse({
      description: "BadRequest",
      content: {
        JSON: {
          examples: {
            ex1: {
              summary: "10글자 이상의 닉네임을 줬을때",
              value: {
                message: [
                  "nickname must be shorter than or equal to 10 characters",
                ],
                error: "Bad Request",
                statusCode: 400,
              },
            },
            ex2: {
              summary: "1글자도 주지 않았을 때",
              value: {
                message: [
                  "nickname must be longer than or equal to 1 characters",
                ],
                error: "Bad Request",
                statusCode: 400,
              },
            },
            ex3: {
              summary: "string 형태가 아닐 때 혹은 그 밖에",
              value: {
                message: [
                  "nickname must be shorter than or equal to 10 characters",
                  "nickname must be longer than or equal to 1 characters",
                ],
                error: "Bad Request",
                statusCode: 400,
              },
            },
          },
        },
      },
    }),

    ApiConflictResponse({
      content: {
        JSON: {
          examples: {
            ex1: {
              summary: "해당 닉네임이 다른유저한테 이미 등록되어 있는경우",
              value: {
                message: "'2번닉네임' is duplicated.",
                error: "Conflict",
                statusCode: 409,
              },
            },

            ex2: {
              summary: "유저 본인이 이미 닉네임을 가지고 있는 경우",
              value: {
                message: "User already has a nickname.",
                error: "Conflict",
                statusCode: 409,
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
