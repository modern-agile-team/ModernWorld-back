import {
  Body,
  Controller,
  Logger,
  MessageEvent,
  Param,
  Post,
  Sse,
  UseGuards,
} from "@nestjs/common";
import { Observable, map, startWith } from "rxjs";
import { SseService } from "./sse.service";
import { ParsePositiveIntPipe } from "src/common/pipes/parse-positive-int.pipe";
import { ApiBody } from "@nestjs/swagger";
import { AccessTokenAuthGuard } from "src/auth/jwt/jwt.guard";
import { UserNo } from "src/auth/auth.decorator";
import { ApiConnectSse } from "./swagger-decorators/connect-sse.decorator";

@Controller("sse")
export class SseController {
  constructor(
    private readonly logger: Logger,
    private readonly sseService: SseService,
  ) {}

  //SSE 연결 Route
  @Sse()
  @ApiConnectSse()
  @UseGuards(AccessTokenAuthGuard)
  sse(@UserNo() userNo: number): Observable<MessageEvent> {
    this.logger.log(`${userNo} : Try SSE connection.`);
    const notifications$ = this.sseService.getSubject(`${userNo}`);

    return notifications$.pipe(
      startWith("Connected"),
      map((message) => {
        return { data: message };
      }),
    );
  }

  // @Post(":userNo")
  // @ApiBody({
  //   schema: {
  //     type: "object",
  //     properties: {
  //       content: {
  //         type: "string",
  //         default: "김뿡뿡",
  //       },
  //     },
  //   },
  // })
  // asdf(
  //   @Param("userNo", ParsePositiveIntPipe) userNo: number,
  //   @Body("content") content: string,
  // ) {
  //   return this.sseService.sendSse(userNo, {
  //     title: `${userNo}번 김뿡우`,
  //     content: content,
  //   });
  // }
}
