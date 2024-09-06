import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
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
      description: "정규표현식에 맞지 않는경우",
      content: {
        JSON: {
          example: {
            message: [
              "nickname must match /^[a-zA-Z가-힣0-9]{2,10}$/ regular expression",
            ],
            error: "Bad Request",
            statusCode: 400,
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

    ApiBearerAuth("access-token"),
  );
}
