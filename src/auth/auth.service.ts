import { Injectable } from "@nestjs/common";
import { UserProvider } from 'src/auth/user-provider.enum';
import axios from 'axios';

@Injectable()
export class AuthService {

  async login(authorizeCode: string, provider: UserProvider) {
   try {
    let tokenUrl: string,
        tokenHeader: object,
        tokenBody: object,
        userInfoUrl: string,
        userInfoHeader: object;
        if (provider === UserProvider.Google) {
          // 구글 토큰 발급
          tokenUrl = 'https://oauth2.googleapis.com/token';
          tokenHeader = {
            headers: {
              'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
          };
          tokenBody = {
            grant_type: 'authorization_code',
            client_id: this.appConfigService.get<string>(
              process.env.GOOGLE_CLIENT_ID,
            ),
            client_secret: this.appConfigService.get<string>(
              process.env.GOOGLE_CLIENT_SECRET,
            ),
            code: authorizeCode,
            redirect_uri: this.appConfigService.get<string>(
              process.env.GOGLE_CLIENT_CALLBACK_URL,
            ),
          };
        }
        const token = (await axios.post(tokenUrl, tokenBody, tokenHeader)).data;

        const socialAccessToken = token.access_token;
        const socialRefreshToken = token.refresh_token;
      }
  getHello(): string {
    throw new Error("Method not implemented.");
  }
  googleLogin(req: { user: any }) {
    if (!req.user) {
      return "No user from google";
    }

    return {
      message: "User information from google",
      user: req.user,
    };
  }
}
}
