import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Length,
} from "class-validator";

export class CreateUserDto {
  @IsString()
  @Length(1, 30)
  nickname: string;

  @IsOptional()
  @Length(1, 150)
  description?: string;

  @IsNotEmpty()
  @IsObject()
  attendance: object;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @IsNotEmpty()
  @IsString()
  uniqueIdentifier: string;

  @IsNotEmpty()
  @IsString()
  @Length(12, 200)
  socialName: string;

  @IsOptional()
  @IsString()
  @Length(1, 300)
  image?: string;

  @IsIn(["naver", "kakao", "google"])
  domain: string;
}
