import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiUpdateUserCharacter() {
  return applyDecorators(
    ApiOperation({
      summary: "유저 캐릭터 사용",
      description: "유저가 캐릭터를 사용(변경)합니다.",
    }),

    ApiOkResponse({
      description: "Success",
      content: {
        JSON: {
          example: {
            no: 1,
            characterNo: 1,
            userNo: 1,
            status: true,
          },
        },
      },
    }),

    ApiBadRequestResponse({
      description: "param의 characterNo가 양의 정수가 아닐때",
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

    ApiNotFoundResponse({
      description: "유저가 해당번호의 캐릭터가 없을때",
      content: {
        JSON: {
          example: {
            message: "User doesn't have that character.",
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
