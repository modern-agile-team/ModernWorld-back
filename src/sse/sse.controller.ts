import { Controller, MessageEvent, Param, Sse } from "@nestjs/common";
import { Observable, interval, map } from "rxjs";
import { SseService } from "./sse.service";

@Controller("sse")
export class SseController {
  constructor(private readonly sseService: SseService) {}

  //SSE 연결 Route
  @Sse(":userId")
  sse(@Param("userId") userId: string): Observable<MessageEvent> {
    const notifications$ = this.sseService.getNotificationSubject(userId);

    return notifications$.pipe(
      map((message) => {
        return { data: message };
      }),
    );
  }
}
