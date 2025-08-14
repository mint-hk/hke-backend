import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

@Exclude()
export class SignInDTO {
  @Expose()
  @IsEmail()
  login: string;

  @Expose()
  @IsString()
  password: string;
}
