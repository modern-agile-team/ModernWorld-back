import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from "@nestjs/swagger";

export function ApiUpdatePresentStatus() {
  return applyDecorators(
    ApiOperation({
      summary: "특정 선물 수락 / 거절",
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
            no: 2,
            itemNo: 1,
            senderNo: 5,
            receiverNo: 1,
            createdAt: "2024-07-01T05:00:46.000Z",
            status: "accept",
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
          examples: {
            ex1: {
              summary: "수신자가 아닐 때",
              description:
                "수신자만이 해당 선물의 상태를 조작(accept, reject) 가능",
              value: {
                message: "Users can only accept or reject their own gifts.",
                error: "Forbidden",
                statusCode: 403,
              },
            },

            ex2: {
              summary: "해당 선물의 status가 read 상태가 아닌 경우",
              description: "선물의 status가 read인 경우만 해당 로직 사용가능",
              value: {
                message: "Present's status must be 'read'",
                error: "Forbidden",
                statusCode: 403,
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
