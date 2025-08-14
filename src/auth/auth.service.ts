import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from 'src/common/crypto.util';
import { ConfigService } from '@nestjs/config';
import { AuthConfiguration } from 'src/configuration';
import { ACCESS_TOKEN_EXPIRE, REFRESH_TOKEN_EXPIRE } from './constants';
import { UpdateUserDTO } from 'src/users/dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.authConfig = this.configService.getOrThrow<AuthConfiguration>('auth');
  }

  private readonly authConfig: AuthConfiguration;

  async signIn(login: string, password: string): Promise<string> {
    try {
      const user = await this.usersService.getByLoginOrThrow(login);
      if (user.password !== encryptPassword(password, this.authConfig.salt)) {
        throw new UnauthorizedException();
      }

      const payload = { sub: user.id, login: user.login };
      const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: REFRESH_TOKEN_EXPIRE });

      const refreshHash = encryptPassword(refreshToken, this.authConfig.salt);
      const partialEntity: UpdateUserDTO = { refreshHash };
      await this.usersService.edit(user.id, partialEntity);

      return refreshToken;
    } catch {
      throw new UnauthorizedException();
    }
  }

  async refreshToken(refreshToken: string): Promise<string> {
    try {
      const secret = this.authConfig.jwtSecret;
      await this.jwtService.verifyAsync(refreshToken, { secret });

      const refreshHash = encryptPassword(refreshToken, this.authConfig.salt);
      await this.usersService.getByRefreshHashOrThrow(refreshHash);

      const payload = { sub: refreshHash };

      return this.jwtService.sign(payload, { expiresIn: ACCESS_TOKEN_EXPIRE });
    } catch {
      throw new UnauthorizedException();
    }
  }
}
