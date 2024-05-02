import { Injectable } from "@nestjs/common";
import { UserProvider } from "src/auth/user-provider.enum";
import axios from "axios";
import { UsersService } from "src/users/users.service";
import { UserRepository } from "src/users/users.repository";

@Injectable()
export class AuthService {
  private tokenUrl: string;
  private grant_type: string;
  private client_id: string;
  private client_secret: string;
  private code: string;
  private state: string;
  private userInfoUrl: string;
  private redirect_uri: string;
  constructor(private readonly userRepository: UserRepository) {}
  async naverLogin(authorizeCode: string) {
    try {
      // 여기서 this 키워드를 사용하여 클래스 속성에 접근할 수 있습니다.
      this.tokenUrl = "https://nid.naver.com/oauth2.0/token";
      this.grant_type = "authorization_code";
      this.client_id = process.env.NAVER_CLIENT_ID;
      this.client_secret = process.env.NAVER_CLIENT_SECRET;
      this.code = authorizeCode;
      this.state = "test";
      const token = (
        await axios.post(
          this.tokenUrl,
          {
            grant_type: this.grant_type,
            client_id: this.client_id,
            client_secret: this.client_secret,
            code: this.code,
            state: this.state,
          },
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
        )
      ).data;
      const socialAccessToken = token.access_token;
      const socialRefreshToken = token.refresh_token;
      this.userInfoUrl = "https://openapi.naver.com/v1/nid/me";
      const userInfo = (
        await axios.get(this.userInfoUrl, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${socialAccessToken}`,
          },
        })
      ).data;
      console.log(userInfo);

      // const user = await this.userRepository.createUser()

      //id 값이 존재하면 유저 키값 가져와서 최신화 존재하지 않으면 db상에 저장
    } catch (error) {
      // 에러 처리
    }
  }
  async kakaoLogin(authorizeCode: string) {
    try {
      // 여기서 this 키워드를 사용하여 클래스 속성에 접근할 수 있습니다.
      this.tokenUrl = "https://kauth.kakao.com/oauth/token";
      this.grant_type = "authorization_code";
      this.client_id = process.env.CACAOK_CLIENT_ID;
      this.client_secret = process.env.CACAOK_CLIENT_SECRET;
      this.redirect_uri = process.env.CACAOK_CLIENT_CALLBACK_URL;
      this.code = authorizeCode;
      this.state = "test";
      const token = (
        await axios.post(
          this.tokenUrl,
          {
            grant_type: this.grant_type,
            client_id: this.client_id,
            client_secret: this.client_secret,
            code: this.code,
            state: this.state,
            redirect_uri: this.redirect_uri,
          },
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          },
        )
      ).data;
      const socialAccessToken = token.access_token;
      const socialRefreshToken = token.refresh_token;
      this.userInfoUrl = "https://openapi.naver.com/v1/nid/me";
      const userInfo = (
        await axios.get(this.userInfoUrl, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${socialAccessToken}`,
          },
        })
      ).data;
      console.log(userInfo);
    } catch (error) {
      // 에러 처리
    }
  }
}
// async googleLogin(authorizeCode: string) {
//   try {
//     this.tokenUrl = "구글 토큰 URL";
//     this.grant_type = "구글 grant type";
//     this.client_id = "구글 클라이언트 ID";
//     this.client_secret = "구글 클라이언트 Secret";
//     this.code = authorizeCode;
//     this.state = "구글 state";
//     // 나머지 로직 추가
//   } catch (error) {
//     // 에러 처리
//   }
// }

// async kakaoLogin(authorizeCode: string) {
//   try {
//     this.tokenUrl = "카카오 토큰 URL";
//     this.grant_type = "카카오 grant type";
//     this.client_id = "카카오 클라이언트 ID";
//     this.client_secret = "카카오 클라이언트 Secret";
//     this.code = authorizeCode;
//     this.state = "카카오 state";
//     // 나머지 로직 추가
//   } catch (error) {
//     // 에러 처리
//   }
// }

//   async login(authorizeCode: string, provider: UserProvider) {
//    try {
//     let tokenUrl: string,
//         tokenHeader: object,
//         tokenBody: object,
//         userInfoUrl: string,
//         userInfoHeader: object;
//         if (provider === UserProvider.Google) {
//           // 구글 토큰 발급
//           tokenUrl = 'https://oauth2.googleapis.com/token';
//           tokenHeader = {
//             headers: {
//               'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
//             },
//           };
//           tokenBody = {
//             grant_type: 'authorization_code',
//             client_id: this.appConfigService.get<string>(
//               process.env.GOOGLE_CLIENT_ID,
//             ),
//             client_secret: this.appConfigService.get<string>(
//               process.env.GOOGLE_CLIENT_SECRET,
//             ),
//             code: authorizeCode,
//             redirect_uri: this.appConfigService.get<string>(
//               process.env.GOGLE_CLIENT_CALLBACK_URL,
//             ),
//           };
//         }
//         const token = (await axios.post(tokenUrl, tokenBody, tokenHeader)).data;

//         const socialAccessToken = token.access_token;
//         const socialRefreshToken = token.refresh_token;
//       }
//   getHello(): string {
//     throw new Error("Method not implemented.");
//   }
//   googleLogin(req: { user: any }) {
//     if (!req.user) {
//       return "No user from google";
//     }

//     return {
//       message: "User information from google",
//       user: req.user,
//     };
//   }
// }
// }
