import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

export function ApiCraeteNeighbor() {
  return applyDecorators(
    ApiOperation({
      summary: "이웃 신청 API",
      description: "이웃 신청을 보내는 API입니다.",
    }),
    ApiResponse({
      status: 201,
      description: "이웃 신청을 성공적으로 생성한 경우",
      content: {
        JSON: {
          example: {
            no: 17,
            senderNo: 8,
            receiverNo: 6,
            status: false,
            createdAt: "2024-07-12T13:40:39.000Z",
          },
        },
      },
    }),

    ApiResponse({
      status: 400,
      description: "Bad Request",
      content: {
        JSON: {
          examples: {
            selfNeighborRequest: {
              summary: "본인에게 이웃 신청을 보내는 경우",
              value: {
                statusCode: 400,
                message: "이웃신청을 자기 자신에게 보낼 수 없습니다.",
              },
            },
            existNeighborRequest: {
              summary: "이미 이웃신청을 보낸 경우",
              value: {
                statusCode: 400,
                message: "이미 해당 유저에게 이웃신청을 보냈습니다.",
              },
            },
            checkMyNeighbor: {
              summary: "상대방과 이미 이웃인 경우",
              value: {
                statusCode: 400,
                message: "상대방과는 이미 이웃입니다.",
              },
            },
          },
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
