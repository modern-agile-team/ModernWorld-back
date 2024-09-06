import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
} from "@nestjs/swagger";

export function ApiDeleteOnePresent() {
  return applyDecorators(
    ApiOperation({
      summary: "특정 선물 발신 / 수신 기준 삭제",
      description:
        "한번 삭제하면 복구 불가, 그 사용자는 다시는 해당 선물을 볼수 없음",
    }),

    ApiParam({
      name: "presentNo",
      example: 1,
    }),

    ApiNoContentResponse({
      description: "Success",
    }),

    ApiBadRequestResponse({
      description: "param의 presentNo가 양의 정수가 아닌경우",
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
      description:
        "해당하는 번호의 선물이 유저와 관계가 없을경우 (수신자, 발신자 어느 경우에도 해당되지 않는경우임)",
      content: {
        JSON: {
          example: {
            message: "This present is not related with you.",
            error: "Forbidden",
            statusCode: 403,
          },
        },
      },
    }),

    ApiNotFoundResponse({
      description: "해당하는 번호의 선물이 없는 경우",
      content: {
        JSON: {
          example: {
            message: "This present doesn't exist.",
            error: "Not Found",
            statusCode: 404,
          },
        },
      },
    }),

    ApiConflictResponse({
      content: {
        JSON: {
          examples: {
            ex1: {
              summary: "발신자 입장에서 이미 삭제되어 있을 경우",
              value: {
                message: "Already deleted from sender.",
                error: "Conflict",
                statusCode: 409,
              },
            },

            ex2: {
              summary: "수신자 입장에서 이미 삭제되어 있을 경우",
              value: {
                message: "Already deleted from receiver.",
                error: "Conflict",
                statusCode: 409,
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

    ApiBearerAuth("access-token"),
  );
}
