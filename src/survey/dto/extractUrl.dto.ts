/* eslint-disable prettier/prettier */
import { IsUrl, IsNotEmpty } from 'class-validator';

export class extractUrlDto {
  @IsUrl()
  @IsNotEmpty()
  url: string;
}
