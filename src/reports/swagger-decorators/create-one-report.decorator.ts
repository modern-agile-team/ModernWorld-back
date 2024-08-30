import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
} from "@nestjs/swagger";

export function ApiCreateOneReport() {
  return applyDecorators(
    ApiOperation({ summary: "report 생성" }),

    ApiCreatedResponse({
      description: "Success",
      content: {
        JSON: {
          example: {
            no: 4,
            sender: {
              no: 31,
              nickname: "엄준식",
            },
            receiver: {
              no: 2,
              nickname: "2번닉네임",
            },
            content: "string",
            createdAt: "2024-08-30T12:06:27.000Z",
            category: "other",
          },
        },
      },
    }),

    ApiBadRequestResponse({
      description: "query의 조건이 맞지 않는 경우",
      content: {
        JSON: {
          example: {
            message: [
              "receiverNo must be a positive number",
              "receiverNo must be an integer number",
              "content must be longer than or equal to 1 and shorter than or equal to 250 characters",
              "content must be a string",
              "category must be one of the following values: spam, harmfulContent, scamImpersonation, copyrightInfringement, explicitContent, abusiveBehavior, misinformation, duplicateContent, hateSpeech, technicalIssue, other",
            ],
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
