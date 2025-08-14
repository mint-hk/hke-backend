import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';
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
  @MinLength(MIN_LOGIN_LENGTH, {
    message: 'Login is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @MinLength(MAX_LOGIN_LENGTH, {
    message: 'Login is too long. Maximum length is $constraint1 characters, but actual is $value',
  })
  login: string;

  @Expose()
  @IsString()
  @MinLength(MIN_PASSWORD_LENGTH, {
    message: 'Password is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @MinLength(MAX_PASSWORD_LENGTH, {
    message: 'Password is too long. Maximum length is $constraint1 characters, but actual is $value',
  })
  password: string;

  @Expose()
  @IsString()
  @MinLength(MIN_DISPLAY_NAME_LENGTH, {
    message: 'Display name is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @MinLength(MAX_DISPLAY_NAME_LENGTH, {
    message: 'Display name is too long. Maximum length is $constraint1 characters, but actual is $value',
  })
  displayName: string;

  @ApiHideProperty()
  @Expose()
  @IsString()
  refreshHash: string;
}
