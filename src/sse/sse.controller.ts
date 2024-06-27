import { Controller, Logger, MessageEvent, Param, Sse } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { SseService } from "./sse.service";

@Controller("sse")
export class SseController {
  constructor(
    private readonly logger: Logger,
    private readonly sseService: SseService,
  ) {}

  //SSE 연결 Route
  @Sse(":userNo")
  sse(@Param("userNo") userNo: string): Observable<MessageEvent> {
    this.logger.log(`${userNo} : Try SSE connection.`);
    const notifications$ = this.sseService.getSubject(userNo);

    return notifications$.pipe(
      map((message) => {
        return { data: message };
      }),
    );
  }
}
