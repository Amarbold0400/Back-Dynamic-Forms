/* eslint-disable prettier/prettier */
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class UsersDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   password: string;
}
