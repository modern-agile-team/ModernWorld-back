import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiCreateComment() {
  return applyDecorators(
    ApiOperation({
      summary: "방명록 생성하는 API",
      description: "방명록을 생성합니다.",
    }),

    ApiCreatedResponse({
      description: "댓글을 성공적으로 생성한 경우",
      content: {
        JSON: {
          example: {
            no: 98,
            receiverNo: 1,
            senderNo: 1,
            content: "모던애자일 사랑해요.",
            createdAt: "2024-06-26T08:36:44.000Z",
            deletedAt: null,
          },
        },
      },
    }),

    ApiBadRequestResponse({
      content: {
        JSON: {
          examples: {
            ex1: {
              summary: "body의 content가 1자 이상 100자 이하가 아닌 경우",
              value: {
                message: [
                  "content must be longer than or equal to 1 and shorter than or equal to 100 characters",
                ],
                error: "Bad Request",
                statusCode: 400,
              },
            },

            ex2: {
              summary: "param의 userNo가 양의 정수가 아닌 경우",
              value: {
                message: "Validation failed (positive int string is expected)",
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
