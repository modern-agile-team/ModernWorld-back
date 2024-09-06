import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiCreateOnePresent() {
  return applyDecorators(
    ApiOperation({
      summary: "특정 유저에게 선물하기",
      description:
        "특정 유저(userNo)의 presents에 생성 = 즉 특정유저에게 아이템을 선물하겠다.",
    }),

    ApiBadRequestResponse({
      content: {
        JSON: {
          examples: {
            ex1: {
              summary: "param의 userNo가 양의 정수가 아닌경우",
              value: {
                message: "Validation failed (positive int string is expected)",
                error: "Bad Request",
                statusCode: 400,
              },
            },
            ex2: {
              summary: "body의 itemNo가 양의 정수가 아닌 경우",
              value: {
                message: [
                  "itemNo must be an integer number",
                  "itemNo must be a positive number",
                ],
                error: "Bad Request",
                statusCode: 400,
              },
            },
          },
        },
      },
    }),

    ApiForbiddenResponse({
      content: {
        JSON: {
          examples: {
            ex1: {
              summary: "유저가 자기 자신에게 선물한 경우",
              value: {
                message: "User cannot gift themselves alone.",
                error: "Forbidden",
                statusCode: 403,
              },
            },

            ex2: {
              summary: "유저가 충분한 포인트가 없었을 경우",
              value: {
                message: "User doesn't have enough point.",
                error: "Forbidden",
                statusCode: 403,
              },
            },
          },
        },
      },
    }),

    ApiNotFoundResponse({
      content: {
        JSON: {
          examples: {
            ex1: {
              summary: "받는이를 찾을수 없었을 경우",
              value: {
                message: "Couldn't find receiver.",
                error: "Not Found",
                statusCode: 404,
              },
            },

            ex2: {
              summary: "해당하는 아이템이 존재하지 않을 경우",
              value: {
                message: "Item doesn't exist.",
                error: "Not Found",
                statusCode: 404,
              },
            },
          },
        },
      },
    }),

    ApiCreatedResponse({
      description: "Success",
      content: {
        JSON: {
          example: {
            no: 14,
            itemNo: 1,
            senderNo: 31,
            receiverNo: 1,
            createdAt: "2024-08-11T10:44:29.000Z",
            status: "unread",
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
