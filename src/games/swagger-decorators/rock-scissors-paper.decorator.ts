import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
} from "@nestjs/swagger";

export function ApiRockScissorsPaper() {
  return applyDecorators(
    ApiOkResponse({
      description: "가위바위보 결과 반환",
      content: {
        JSON: {
          example: {
            no: 17,
            userNo: 31,
            userChoice: "Rock",
            computerChoice: "Paper",
            result: "lose",
            createdAt: "2024-08-02T02:52:18.000Z",
          },
        },
      },
    }),

    ApiBadRequestResponse({
      description: "body의 choice가 0, 1, 2가 아닌 경우",
      content: {
        JSON: {
          example: {
            message: [
              "choice must be an integer number",
              "choice must not be greater than 2",
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
