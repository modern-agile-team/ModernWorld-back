import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
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
    ApiProperty({ name: "characterNo", example: 22 }),
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
      description: "characterNo가 정수 형태가 아닐 때",
      content: {
        JSON: {
          example: {
            message: "Validation failed (numeric string is expected)",
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
  );
}
