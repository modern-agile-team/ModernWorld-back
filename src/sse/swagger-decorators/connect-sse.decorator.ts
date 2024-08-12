import { applyDecorators } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiConnectSse() {
  return applyDecorators(
    ApiOperation({
      summary: "SSE 연결",
      description: "SSE 연결",
    }),

    ApiOkResponse({
      description:
        "SSE 연결 성공 및 이후 이벤트 발생, SSE로 발생된 모든 이벤트는 alarm table에 저장됩니다. (연결 성공했을때 Connected 제외)",
      content: {
        JSON: {
          examples: {
            ex1: {
              summary: "SSE 연결 성공",
              value: {
                data: "Connected",
              },
            },

            ex2: {
              summary: "방명록",
              value: {
                title: "방명록",
                content: "???님이 방명록을 남겼습니다.",
              },
            },

            ex3: {
              summary: "게임",
              value: {
                title: "게임",
                content:
                  "[가위 바위 보 게임]에서 승리하셨습니다! ???포인트를 획득하셨습니다!",
              },
            },

            ex4: {
              summary: "좋아요",
              value: {
                title: "좋아요",
                content: `???님이 좋아요를 눌렀습니다.`,
              },
            },

            ex5: {
              summary: "이웃",
              value: {
                title: "이웃",
                content: `???님에게 이웃 요청이 왔습니다.`,
              },
            },

            ex6: {
              summary: "이웃2",
              value: {
                title: "이웃",
                content: `???님과 이웃이 되었습니다.`,
              },
            },

            ex7: {
              summary: "쪽지",
              value: {
                title: "쪽지",
                content: "???님께서 쪽지를 보냈습니다.",
              },
            },

            ex8: {
              summary: "선물",
              value: {
                title: "선물",
                content: `???님이 ???을 선물로 보냈습니다.`,
              },
            },

            ex9: {
              summary: "쪽지",
              value: {
                title: "쪽지",
                content: "???님께서 쪽지를 보냈습니다.",
              },
            },

            ex10: {
              summary: "이웃",
              value: {
                title: "업적",
                content: `업적 [???]을 달성했습니다! ???포인트를 흭득하셨습니다!`,
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
