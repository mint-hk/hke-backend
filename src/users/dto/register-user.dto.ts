import { PickType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { UserDTO } from './user.dto';

@Exclude()
export class CreateUserDTO extends PickType(UserDTO, ['login', 'displayName', 'password'] as const) {}
