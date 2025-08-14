import { PartialType, PickType } from '@nestjs/swagger';
import { UserDTO } from './user.dto';
import { Exclude } from 'class-transformer';

@Exclude()
export class UpdateUserDTO extends PartialType(PickType(UserDTO, ['displayName', 'refreshHash'] as const)) {}
