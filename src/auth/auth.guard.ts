import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { ESCAPE_GUARD_META_KEY } from './escape-auth.guard';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: Request = context.switchToHttp().getRequest();
      const accessToken = request.cookies.access_token;

      if (!accessToken) {
        throw new UnauthorizedException();
      }
      const payload = await this.jwtService.verifyAsync(accessToken);

      const user = await this.usersService.getByRefreshHashOrThrow(payload.sub);
      request['user'] = user;

      return true;
    } catch {
      const isOptional = this.reflector.get<boolean>(ESCAPE_GUARD_META_KEY, context.getHandler());
      if (isOptional) {
        return true;
      } else {
        throw new UnauthorizedException();
      }
    }
  }
}
