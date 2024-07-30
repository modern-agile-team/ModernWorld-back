import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
} from "@nestjs/swagger";

export function ApiCreateOnePost() {
  return applyDecorators(
    ApiOperation({
      summary: "쪽지 생성",
      description: "특정 유저에게 쪽지를 생성합니다.",
    }),

    ApiParam({
      name: "userNo",
      example: 1,
    }),

    ApiCreatedResponse({
      description: "Success",
      content: {
        JSON: {
          example: {
            no: 19,
            content: "김뿡우",
            createdAt: "2024-07-28T09:39:52.000Z",
            check: false,
            senderDelete: false,
            receiverDelete: false,
            userPostSenderNo: {
              no: 31,
              nickname: "쌉악질",
            },
            userPostReceiverNo: {
              no: 1,
              nickname: "1",
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
              summary: "param의 userNo가 양의 정수가 아닐 경우",
              value: {
                message: "Validation failed (positive int string is expected)",
                error: "Bad Request",
                statusCode: 400,
              },
            },

            ex2: {
              summary: "body의 content가 1글자 미만인 경우",
              value: {
                message: [
                  "content must be longer than or equal to 1 characters",
                ],
                error: "Bad Request",
                statusCode: 400,
              },
            },

            ex3: {
              summary: "body의 content가 100글자 이상인 경우",
              value: {
                message: [
                  "content must be shorter than or equal to 100 characters",
                ],
                error: "Bad Request",
                statusCode: 400,
              },
            },
          },
        },
      },
    }),

    ApiForbiddenResponse({
      description: "유저 본인한테 쪽지를 쓰려한 경우",
      content: {
        JSON: {
          example: {
            message: "Users cannot post themselves alone.",
            error: "Forbidden",
            statusCode: 403,
          },
        },
      },
    }),

    ApiNotFoundResponse({
      description: "해당하는 번호의 유저가 없는 경우",
      content: {
        JSON: {
          example: {
            message: "Couldn't find receiver.",
            error: "Not Found",
            statusCode: 404,
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
