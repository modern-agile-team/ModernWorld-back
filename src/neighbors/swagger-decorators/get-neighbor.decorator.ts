import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiGetNeighobor() {
  return applyDecorators(
    ApiOperation({
      summary: "neighbor 조회",
    }),
    ApiOkResponse({
      description: "Success",
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
