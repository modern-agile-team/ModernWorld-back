import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiGetLikes() {
  return applyDecorators(
    ApiOperation({
      summary: "좋아요 조회",
      description:
        "type에 아무것도 주지 않으면 default로 receiverNo가 들어갑니다.",
    }),

    ApiOkResponse({
      content: {
        JSON: {
          examples: {
            ex1: {
              summary: "senderNo(한것)",
              value: [
                {
                  no: 92,
                  receiver: {
                    no: 2,
                    nickname: "2번닉네임",
                    image: "2번이미지",
                  },
                },
                {
                  no: 95,
                  receiver: {
                    no: 3,
                    nickname: "3번닉네임",
                    image: "3번이미지",
                  },
                },
                {
                  no: 96,
                  receiver: {
                    no: 30,
                    nickname: "30번닉네임",
                    image: "30번이미지",
                  },
                },
              ],
            },

            ex2: {
              summary: "receiverNo(받은것)",
              value: [
                {
                  no: 98,
                  sender: {
                    no: 2,
                    nickname: "2번닉네임",
                    image: "2번이미지",
                  },
                },
                {
                  no: 97,
                  sender: {
                    no: 3,
                    nickname: "3번닉네임",
                    image: "3번이미지",
                  },
                },
                {
                  no: 99,
                  sender: {
                    no: 4,
                    nickname: "4번닉네임",
                    image: "4번이미지",
                  },
                },
                {
                  no: 100,
                  sender: {
                    no: 5,
                    nickname: "5번닉네임",
                    image: "5번이미지",
                  },
                },
              ],
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
              description: "param의 userNo가 양의 정수가 아닐 경우",
              value: {
                message: "Validation failed (positive int string is expected)",
                error: "Bad Request",
                statusCode: 400,
              },
            },

            ex2: {
              description: "query의 type이 receiverNo, senderNo가 아닐 경우",
              value: {
                message: [
                  "type must be one of the following values: senderNo, receiverNo",
                ],
                error: "Bad Request",
                statusCode: 400,
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
