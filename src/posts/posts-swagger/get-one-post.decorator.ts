import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from "@nestjs/swagger";

export function ApiGetOnePost() {
  return applyDecorators(
    ApiOperation({
      summary: "유저의 쪽지 하나 불러오기",
    }),

    ApiParam({
      name: "postNo",
      example: 1,
    }),

    ApiOkResponse({
      description: "Success",
      content: {
        JSON: {
          example: {
            no: 2,
            content: "엄준식사",
            check: false,
            createdAt: "2024-07-01T05:00:46.000Z",
            userPostSenderNo: {
              no: 1,
              nickname: "1번 닉네임",
            },
            userPostReceiverNo: {
              no: 3,
              nickname: "3번닉네임",
            },
          },
        },
      },
    }),

    ApiBadRequestResponse({
      description: "param의 postNo가 양의 정수가 아닌 경우",
      content: {
        JSON: {
          example: {
            message: "Validation failed (positive int string is expected)",
            error: "Bad Request",
            statusCode: 400,
          },
        },
      },
    }),

    ApiForbiddenResponse({
      description:
        "해당 쪽지가 유저와 관련이 없을 때, userNo가 senderNo, receiverNo 둘중에 하나라도 해당되는게 없다면 반환합니다.",
      content: {
        JSON: {
          example: {
            message: "This post is not related with user.",
            error: "Forbidden",
            statusCode: 403,
          },
        },
      },
    }),

    ApiNotFoundResponse({
      content: {
        JSON: {
          examples: {
            ex1: {
              summary: "해당 번호의 쪽지가 존재하지 않을 경우",
              value: {
                message: "This post doesn't exist.",
                error: "Not Found",
                statusCode: 404,
              },
            },

            ex2: {
              summary: "발신자가 해당 쪽지 삭제한 경우",
              description: "발신자는 다시는 쪽지를 확인할 수 없습니다.",
              value: {
                message: "This post was deleted from sender.",
                error: "Not Found",
                statusCode: 404,
              },
            },

            ex3: {
              summary: "수신자가 해당 쪽지를 삭제한 경우",
              description: "수신자는 다시는 쪽지를 확인할 수 없습니다.",
              value: {
                message: "This post was deleted from receiver.",
                error: "Not Found",
                statusCode: 404,
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
