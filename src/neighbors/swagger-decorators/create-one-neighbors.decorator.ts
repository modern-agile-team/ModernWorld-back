import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiCraeteNeighbor() {
  return applyDecorators(
    ApiOperation({
      summary: "이웃 생성 API",
    }),

    ApiCreatedResponse({
      description: "Success",
      content: {
        JSON: {
          examples: {
            requestSucces: {
              summary: "이웃요청을 성공적으로 보낸 경우",
              value: {
                no: 17,
                senderNo: 8,
                receiverNo: 6,
                status: false,
                createdAt: "2024-07-12T13:40:39.000Z",
              },
            },
            existRequestReceiverSendRequest: {
              summary:
                "이웃 요청이 존재하는 상황에서 상대방도 이웃요청을 보낸 경우",
              value: {
                no: 12,
                senderNo: 8,
                receiverNo: 3,
                status: true,
                createdAt: "2024-07-16T20:38:01.000Z",
              },
            },
          },
        },
      },
    }),

    ApiBadRequestResponse({
      description: "param의 userNo가 양의 정수가 아닌 경우",
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
      description: "본인에게 이웃 신청을 보낸 경우",
      content: {
        JSON: {
          example: {
            message: "Users cannot neighbor themselves alone.",
            error: "Forbidden",
            statusCode: 403,
          },
        },
      },
    }),

    ApiNotFoundResponse({
      description: "친구 요청을 보낼 사람이 존재하지 않을 때",
      content: {
        JSON: {
          example: {
            message: "Can't find anyone to receive neighbor requests.",
            error: "Not Found",
            statusCode: 404,
          },
        },
      },
    }),

    ApiConflictResponse({
      description: "Conflict Error",
      content: {
        JSON: {
          examples: {
            ex1: {
              summary: "이미 이웃 신청을 보낸 경우",
              value: {
                message:
                  "You have already sent a neighbor request to this user.",
                error: "Conflict",
                statusCode: 409,
              },
            },
            ex2: {
              summary: "상대방과 이미 이웃인 경우",
              value: {
                message: "The other person are already neighbors.",
                error: "Conflict",
                statusCode: 409,
              },
            },
          },
        },
      },
    }),

    ApiInternalServerErrorResponse({
      description: "서버 오류가 발생한 경우",
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
