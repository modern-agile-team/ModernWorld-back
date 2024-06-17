import { Controller, MessageEvent, Param, Sse } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { SseService } from "./sse.service";

@Controller("sse")
export class SseController {
  constructor(private readonly sseService: SseService) {}

  //SSE 연결 Route
  @Sse(":userNo")
  sse(@Param("userNo") userNo: string): Observable<MessageEvent> {
    console.log(`${userNo} : SSE 연결이왔어용`);
    const notifications$ = this.sseService.getSubject(userNo);

    return notifications$.pipe(
      map((message) => {
        return { data: message };
      }),
    );
  }
}
