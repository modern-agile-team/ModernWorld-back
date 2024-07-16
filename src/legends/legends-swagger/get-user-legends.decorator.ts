import { applyDecorators } from "@nestjs/common";
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiGetUserLegends() {
  return applyDecorators(
    ApiOperation({
      summary: "업적 현황(기록) 조회",
      description: "업적 현황을(기록) 조회합니다.",
    }),

    ApiOkResponse({
      description: "Success",
      content: {
        JSON: {
          example: {
            userNo: 1,
            attendanceCount: 0,
            commentCount: 22,
            itemCount: 36,
            presentCount: 2,
            likeCount: 7,
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
