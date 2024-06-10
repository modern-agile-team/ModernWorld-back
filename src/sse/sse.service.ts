import { Injectable, Sse } from "@nestjs/common";
import { Observable, Subject, interval, map, of } from "rxjs";

@Injectable()
export class SseService {
  // Map 객체를 만든다.
  private notifications = new Map<string, Subject<string>>();

  //SSE 연결을 위한 메서드
  getNotificationSubject(userId: string): Subject<string> {
    if (!this.notifications.has(userId)) {
      this.notifications.set(userId, new Subject<string>());
    }

    return this.notifications.get(userId);
  }

  asds(userNo: number, content: string) {
    const subject = this.getNotificationSubject(`${userNo}`);

    return subject.next(content);
  }
}
