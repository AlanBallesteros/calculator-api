import { IsDefined, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  @IsEmail()
  username: string;

  @IsDefined()
  @IsString()
  password: string;
}
