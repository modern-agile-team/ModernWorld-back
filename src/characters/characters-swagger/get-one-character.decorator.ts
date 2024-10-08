import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
} from "@nestjs/swagger";

export function ApiGetOneCharacter() {
  return applyDecorators(
    ApiOperation({
      summary: "특정 캐릭터 불러오기 API",
      description: "특정 캐릭터를 불러옵니다.",
    }),

    ApiProperty({ name: "characterNo", example: 1 }),

    ApiOkResponse({
      status: 200,
      description: "Success",
      content: {
        JSON: {
          example: {
            no: 1,
            name: "1번 cat 이름",
            description: "1번 cat 설명",
            image: "1번 cat 이미지",
            species: "cat",
            price: 100,
          },
        },
      },
    }),

    ApiBadRequestResponse({
      description: "characterNo가 양의 정수가 아닐때",
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
