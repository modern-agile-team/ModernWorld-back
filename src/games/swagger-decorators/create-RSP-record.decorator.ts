import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiCreateRSPRecord() {
  return applyDecorators(
    ApiOperation({ summary: "가위바위보 실행(생성)" }),

    ApiCreatedResponse({
      description: "가위바위보 결과 반환",
      content: {
        JSON: {
          example: {
            userChoice: "Scissors",
            computerChoice: "Scissors",
            result: "draw",
            createdAt: "2024-08-03T09:12:54.000Z",
            user: {
              no: 31,
              nickname: "내이름",
              chance: 96,
            },
          },
        },
      },
    }),

    ApiBadRequestResponse({
      description: "body의 choice가 0, 1, 2, 3 이 아닌 경우",
      content: {
        JSON: {
          example: {
            message: [
              "choice must be an integer number",
              "choice must not be greater than 3",
              "choice must not be less than 0",
            ],
            error: "Bad Request",
            statusCode: 400,
          },
        },
      },
    }),

    ApiForbiddenResponse({
      description: "chance가 0인 경우",
      content: {
        JSON: {
          example: {
            message: "User doesn't have a chance",
            error: "Forbidden",
            statusCode: 403,
          },
        },
      },
    }),

    ApiBearerAuth("access-token"),
  );
}
