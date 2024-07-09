import { applyDecorators } from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiCreateUserItem() {
  return applyDecorators(
    ApiOperation({
      summary: "아이템 생성(구매)",
      description: "아이템을 생성(구매)합니다.",
    }),

    ApiCreatedResponse({
      description: "Created",
      content: {
        JSON: {
          example: {
            no: 182,
            userNo: 1,
            itemNo: 12,
            createdAt: "2024-07-08T07:09:07.000Z",
            status: false,
          },
        },
      },
    }),

    ApiForbiddenResponse({
      description: "유저가 충분한 포인트를 가지고 있지 않을 때",
      content: {
        JSON: {
          example: {
            message: "User doesn't have enough point.",
            error: "Forbidden",
            statusCode: 403,
          },
        },
      },
    }),

    ApiNotFoundResponse({
      description: "해당하는 아이템이 존재하지 않을 때",
      content: {
        JSON: {
          example: {
            message: "Item doesn't exist.",
            error: "Not Found",
            statusCode: 404,
          },
        },
      },
    }),

    ApiConflictResponse({
      description: "유저가 해당 아이템을 이미 가지고 있을 때",
      content: {
        JSON: {
          example: {
            message: "User already owns the item.",
            error: "Conflict",
            statusCode: 409,
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
