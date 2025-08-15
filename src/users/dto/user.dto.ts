import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString, MaxLength, MinLength } from 'class-validator';
import {
  MAX_DISPLAY_NAME_LENGTH,
  MAX_LOGIN_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_DISPLAY_NAME_LENGTH,
  MIN_LOGIN_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '../constants';

@Exclude()
export class UserDTO {
  @Expose()
  @IsString()
  @MinLength(MIN_LOGIN_LENGTH)
  @MaxLength(MAX_LOGIN_LENGTH)
  login: string;

  @Expose()
  @IsString()
  @MinLength(MIN_PASSWORD_LENGTH)
  @MaxLength(MAX_PASSWORD_LENGTH)
  password: string;

  @Expose()
  @IsString()
  @MinLength(MIN_DISPLAY_NAME_LENGTH)
  @MaxLength(MAX_DISPLAY_NAME_LENGTH)
  displayName: string;

  @ApiHideProperty()
  @Expose()
  @IsString()
  refreshHash: string;
}
