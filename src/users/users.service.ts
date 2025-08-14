import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/entities/user.entity';
import { UpdateUserDTO } from './dto/update-user.dto';
import { CreateUserDTO } from './dto/register-user.dto';
import { encryptPassword } from 'src/common/crypto.util';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private readonly configService: ConfigService,
  ) {
    this.salt = this.configService.getOrThrow<string>('auth.salt');
  }
  private readonly salt: string;

  async getByRefreshHashOrThrow(refreshHash: string): Promise<User> {
    const user = await this.userModel.findOne({ where: { refreshHash } });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }

  async getByLogin(login: string): Promise<User | null> {
    const user = await this.userModel.findOne({
      where: { login },
    });

    return user;
  }

  async getByLoginOrThrow(login: string): Promise<User> {
    const user = await this.userModel.findOne({
      where: { login },
    });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }

  async create(createUserDto: CreateUserDTO): Promise<User> {
    const usersExists = await this.getByLogin(createUserDto.login);
    if (usersExists) {
      throw new BadRequestException('A user with this email already exists');
    }
    createUserDto.password = encryptPassword(createUserDto.password, this.salt);

    return this.userModel.create({ ...createUserDto });
  }

  async edit(id: string, partialEntity: UpdateUserDTO) {
    return this.userModel.update(partialEntity, { where: { id } });
  }
}
