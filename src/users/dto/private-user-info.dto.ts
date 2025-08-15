import { OmitType } from '@nestjs/swagger';
import { UserDTO } from './user.dto';
import { Exclude } from 'class-transformer';

@Exclude()
export class PrivateUserInfoDTO extends OmitType(UserDTO, ['password', 'refreshHash'] as const) {}
