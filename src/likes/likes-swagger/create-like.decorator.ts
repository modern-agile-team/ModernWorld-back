import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

export function ApiCreateLike() {
  return applyDecorators(
    ApiOperation({
      summary: "좋아요 생성",
    }),
    ApiResponse({
      status: 201,
      description: "Success",
      content: {
        JSON: {
          example: {
            no: 1,
            receiverNo: 2,
            senderNo: 3,
          },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: "유저 본인한테 좋아요 한 경우",
      content: {
        JSON: {
          example: {
            message: "Users can't like themselves alone.",
            error: "Forbidden",
            statusCode: 401,
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: "해당 번호의 유저가 없을 때",
      content: {
        JSON: {
          example: {
            message: "User doesn't exist.",
            error: "Not Found",
            statusCode: 404,
          },
        },
      },
    }),
    ApiResponse({
      status: 409,
      description: "이미 유저에게 좋아요를 했을 때",
      content: {
        JSON: {
          example: {
            message: "This like already exist.",
            error: "Conflict",
            statusCode: 409,
          },
        },
      },
    }),
    ApiResponse({
      status: 500,
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
