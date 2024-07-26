import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiDeleteOneAlarm() {
  return applyDecorators(
    ApiOperation({
      summary: "알람 삭제",
    }),

    ApiNoContentResponse({
      description: "Success",
    }),

    ApiBadRequestResponse({
      description: "parma의 alarmNo가 양의 정수가 아닐때",
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
      description: "알람이 해당 유저의 것이 아닐때",
      content: {
        JSON: {
          example: {
            message: "This alarm is not related with user.",
            error: "Forbidden",
            statusCode: 403,
          },
        },
      },
    }),

    ApiNotFoundResponse({
      description: "해당 번호의 알람이 존재하지 않을 때",
      content: {
        jSON: {
          example: {
            message: "This alarm doesn't exist.",
            error: "Not Found",
            statusCode: 404,
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
