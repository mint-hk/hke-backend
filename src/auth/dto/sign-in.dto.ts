import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class SignInDTO {
  @Expose()
  @IsString()
  login: string;

  @Expose()
  @IsString()
  password: string;
}
