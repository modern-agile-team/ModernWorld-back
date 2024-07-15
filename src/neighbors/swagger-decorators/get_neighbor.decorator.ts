import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

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

    ApiResponse({
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
