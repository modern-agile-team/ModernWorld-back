import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from "@nestjs/swagger";

export function ApiGetUserOnePresent() {
  return applyDecorators(
    ApiOperation({
      summary: "유저의 선물 하나 불러오기",
    }),

    ApiParam({
      name: "presentNo",
      example: 1,
    }),

    ApiOkResponse({
      description: "Success",
      content: {
        JSON: {
          example: {
            no: 1,
            status: "read",
            createdAt: "2024-07-01T05:00:46.000Z",
            item: {
              name: "1번 아이템",
              image:
                "https://wang0514.s3.ap-northeast-2.amazonaws.com/items/%EC%95%84%EC%9D%B4%ED%85%9C%EB%AA%A8%EC%9D%8C/grandfatherclock.svg",
              description: "1번 아이템 설명",
            },
            userPresentSenderNo: {
              no: 1,
              nickname: "1번 닉네임",
            },
            userPresentReceiverNo: {
              no: 2,
              nickname: "2번닉네임",
            },
          },
        },
      },
    }),

    ApiBadRequestResponse({
      description: "param의 presentNo가 양의 정수가 아닌 경우",
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
      content: {
        JSON: {
          example: {
            summary: "해당 선물이 유저와 관련이 없을 때",
            description:
              "userNo가 senderNo, receiverNo 둘중에 하나라도 해당되는게 없다면 반환합니다.",
            value: {
              message: "This present is not related with user.",
              error: "Forbidden",
              statusCode: 403,
            },
          },
        },
      },
    }),

    ApiNotFoundResponse({
      content: {
        JSON: {
          examples: {
            ex1: {
              summary: "해당 번호의 선물이 존재하지 않을 경우",
              value: {
                message: "This present doesn't exist.",
                error: "Not Found",
                statusCode: 404,
              },
            },

            ex2: {
              summary: "발신자가 해당 선물을 삭제한 경우",
              description: "발신자는 다시는 선물을 확인할 수 없습니다.",
              value: {
                message: "This present was deleted from sender.",
                error: "Not Found",
                statusCode: 404,
              },
            },

            ex3: {
              summary: "수신자가 해당 선물을 삭제한 경우",
              description: "수신자는 다시는 선물을 확인할 수 없습니다.",
              value: {
                message: "This present was deleted from receiver.",
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
  );
}
