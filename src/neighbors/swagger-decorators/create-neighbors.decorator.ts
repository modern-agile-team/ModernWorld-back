import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";

export function ApiCraeteNeighbor() {
  return applyDecorators(
    ApiOperation({
      summary: "이웃 신청 API",
      description: "이웃 신청을 보내는 API입니다.",
    }),
    ApiResponse({
      status: 201,
      description: "created",
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
      status: 400,
      description: "수신자 고유 번호가 숫자 아닐 때",
      content: {
        JSON: {
          example: {
            message: ["receiverNo must be an integer number"],
            error: "Bad Request",
            statusCode: 400,
          },
        },
      },
    }),

    ApiForbiddenResponse({
      status: 403,
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
      status: 404,
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
      status: 409,
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
      status: 500,
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
  );
}