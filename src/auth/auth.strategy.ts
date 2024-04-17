// import { PassportStrategy } from "@nestjs/passport";
// import { Strategy, VerifyCallback } from "passport-google-oauth20";
// import { config } from "dotenv";

// import { Injectable } from "@nestjs/common";

// config();

// @Injectable()
// export class AuthStrategy extends PassportStrategy(Strategy, "google") {
//   constructor() {
//     super({
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.GOOGLE_CLIENT_CALLBACK_URL,
//       scope: ["email", "profile"],
//     });
//   }

//   async validate(
//     accessToken: string,
//     refreshToken: string,
//     profile: any,
//     done: VerifyCallback,
//   ): Promise<any> {
//     const { name, emails, photos } = profile;
//     console.log(profile);
//     const user = {
//       email: emails[0].value,
//       firstName: name.familyName,
//       lastName: name.givenName,
//       picture: photos[0].value,
//       accessToken,
//     };
//     done(null, user);
//   }
// }
