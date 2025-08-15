import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { RegisterUserDTO } from './dto/register-user.dto';
import { plainToInstance } from 'class-transformer';
import { PrivateUserInfoDTO } from './dto/private-user-info.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'register new profile', operationId: 'register' })
  @Post('/')
  async register(@Body() registerUserDto: RegisterUserDTO) {
    const user = await this.usersService.create(registerUserDto);

    return plainToInstance(PrivateUserInfoDTO, user);
  }
}
