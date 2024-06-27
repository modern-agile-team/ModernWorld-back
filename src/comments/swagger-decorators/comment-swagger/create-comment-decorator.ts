import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

export function ApiCreateComment() {
  return applyDecorators(
    ApiOperation({
      summary: "방명록 생성하는 API",
      description: "방명록을 생성합니다.",
    }),
    ApiResponse({
      status: 201,
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
    ApiResponse({
      status: 401,
      description: "우리 서비스의 액세스 토큰이 아닌 경우",
      content: {
        JSON: {
          example: { statusCode: 401, message: "유효하지 않은 토큰입니다." },
        },
      },
    }),
    ApiResponse({
      status: 403,
      description: "만료된 액세스 토큰인 경우",
      content: {
        JSON: {
          example: { statusCode: 403, message: "만료된 토큰입니다." },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: "액세스 토큰이 제공되지 않은 경우",
      content: {
        JSON: {
          example: { statusCode: 400, message: "토큰이 제공되지 않았습니다." },
        },
      },
    }),
    ApiResponse({
      status: 500,
      description: "방명록을 생성하는 데 오류가 발생한 경우",
      content: {
        JSON: {
          example: {
            statusCode: 500,
            message: "댓글을 생성하는 과정 중 오류가 발생했습니다.",
          },
        },
      },
    }),
  );
}
