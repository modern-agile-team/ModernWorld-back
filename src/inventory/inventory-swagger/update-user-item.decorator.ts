import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiUpdateUserItem() {
  return applyDecorators(
    ApiOperation({
      summary: "아이템 사용 / 사용안함",
      description:
        "사용시 해당 아이템과 테마가 다르면서 타입이 같은 아이템은 자동으로 사용해제 처리됩니다.",
    }),

    ApiOkResponse({
      description: "Success",
      content: {
        JSON: {
          examples: {
            ex1: {
              summary: "true를 줬을 때",
              value: {
                no: 13,
                userNo: 1,
                itemNo: 13,
                createdAt: "2024-07-01T05:00:46.000Z",
                status: true,
              },
            },
            ex2: {
              summary: "false를 줬을 때",
              value: {
                no: 13,
                userNo: 1,
                itemNo: 13,
                createdAt: "2024-07-01T05:00:46.000Z",
                status: false,
              },
            },
          },
        },
      },
    }),

    ApiBadRequestResponse({
      content: {
        JSON: {
          examples: {
            ex1: {
              summary: "pararm의 itemNo가 양의 정수가 아닐때",
              value: {
                message: "Validation failed (positive int string is expected)",
                error: "Bad Request",
                statusCode: 400,
              },
            },

            ex2: {
              summary: "body의 status가 booelean 형태가 아닌 경우",
              value: {
                message: ["status must be a boolean value"],
                error: "Bad Request",
                statusCode: 400,
              },
            },
          },
        },
      },
    }),

    ApiNotFoundResponse({
      description: "유저가 해당하는 아이템을 가지고 있지 않을 때",
      content: {
        JSON: {
          example: {
            message: "User doesn't have the item",
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
