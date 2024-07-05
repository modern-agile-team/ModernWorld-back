import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

export function ApiDeleteLike() {
  return applyDecorators(
    ApiOperation({
      summary: "좋아요 삭제",
    }),
    ApiResponse({
      status: 204,
      description: "Success",
    }),
    ApiResponse({
      status: 404,
      description: "해당하는 유저번호(receiver기준)의 좋아요가 없을 때",
      content: {
        JSON: {
          example: {
            message: "This like doesn't exist.",
            error: "Not Found",
            statusCode: 404,
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
