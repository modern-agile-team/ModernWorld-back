import { Injectable } from "@nestjs/common";
import { Subject } from "rxjs";

@Injectable()
export class SseService {
  // Map 객체를 만든다.
  private notifications = new Map<string, Subject<object>>();
  //string타입의 key를 갖고, Subject<string> 타입의 value를 갖는 Map 객체 생성.

  //SSE 연결을 위한 메서드
  getSubject(userNo: string): Subject<object> {
    // Map 객체의 has 메서드는 해당 key가 없다면 false 있다면 true 반환
    // 만약 userNo로 된 Map객체가 없다면
    if (!this.notifications.has(userNo)) {
      // Map객체의 set메서드를 통해 { userNo : Subject<string> } 형태의 Map객체를 생성한다.
      this.notifications.set(userNo, new Subject<object>());
    }
    // Map객체의 get메서드를 통해 key가 userNo인 것의 value를 반환한다.
    // 즉, Subject<string>이 반환됨
    return this.notifications.get(userNo);
  }

  sendSse(userNo: number, content: { data: string; url: string }) {
    // subject 객체를 얻어서
    const subject = this.getSubject(`${userNo}`);

    // 여기서 controller에 정의된 subject가 next를 통해 내부 스트림(로직) 수행
    subject.next(content);
    /**
     * subject의 next메서드를 통해 content를 전달한다.
     * next는 Observer이기도 하면서 observable하다. next를 통해 값을 넣어주면 값을 방!출!
     * subject를 구독하고있는 등록된 observer에게 multicast 됨
     */
  }

  // 이 로직은 스케줄러에 들어갈 로직입니다. 몇분마다 한번씩 돌아가면서 SSE연결 초기화 작업을 해줍니다.
  // 의도는 쓸모없는 메모리 낭비를 막으려고 했습니다. 사용자가 로그아웃하거나, 창을 닫았을 경우 굳이 알람을 보낼 필욘 없죠.
  deleteAllSse() {
    this.notifications.forEach((value, key) => {
      // 구독 종료, 이러면 클라이언트에서 SSE 연결 끊겼다고 계속 재연결하려고 달려듬
      value.complete();

      // Map 객체에 있던 property 제거 = 의미없이 메모리에 떠도는 놈들 제거
      // 이거 안하면 나중에 다시 연결하려고makeSseSubject()로직 들어갔을 때 Map 객체에 Subject<string>이 없어서 뻘짓함
      this.notifications.delete(key);
    });
  }
}
