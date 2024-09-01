import { IsString, IsEmail, Length } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(4, 20)
  password: string;
}

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(4, 20)
  password: string;

  @IsString()
  @Length(4, 20)
  companyName: string;

  @IsString()
  @Length(4, 20)
  role: string;
}
