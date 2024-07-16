import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";

export function ApiGetNeighobor() {
  return applyDecorators(
    ApiOperation({
      summary: "이웃을 불러오는 API",
      description: "이웃을 불러오는 API입니다.",
    }),
    ApiResponse({
      status: 201,
      description: "이웃을 불러오는 데 성공한 경우",
      content: {
        JSON: {
          example: [
            {
              no: 5,
              senderNo: 2,
              receiverNo: 6,
              status: true,
              createdAt: "2024-07-15T13:12:18.000Z",
            },

            {
              no: 4,
              senderNo: 2,
              receiverNo: 5,
              status: true,
              createdAt: "2024-07-12T15:52:18.000Z",
            },
          ],
        },
      },
    }),

    ApiBadRequestResponse({
      status: 400,
      description: "Bad Request",
      content: {
        JSON: {
          examples: {
            ex1: {
              summary: "page가 숫자가 아닐 때",
              value: {
                message: ["page must be an integer number"],
                error: "Bad Request",
                statusCode: 400,
              },
            },
            ex2: {
              summary: "take가 숫자가 아닐 때",
              value: {
                message: ["take must be an integer number"],
                error: "Bad Request",
                statusCode: 400,
              },
            },
            ex3: {
              summary: "take가 음수일 때",
              value: {
                message: ["take must be a positive number"],
                error: "Bad Request",
                statusCode: 400,
              },
            },
            ex4: {
              summary: "page가 음수일 때",
              value: {
                message: ["page must be a positive number"],
                error: "Bad Request",
                statusCode: 400,
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
