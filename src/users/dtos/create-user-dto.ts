export class CreateUserDto {
  nickname: string;

  description?: string;

  attendance: object;

  status: boolean;

  uniqueIdentifier: string;

  socialName: string;

  image?: string;

  domain: string;
}
