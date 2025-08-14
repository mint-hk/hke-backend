import { Body, Controller, Post, Res, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/sign-in.dto';
import express from 'express';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ACCESS_TOKEN_EXPIRE, REFRESH_TOKEN_EXPIRE } from './constants';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'log in and refresh access_token',
    operationId: 'login',
  })
  @Post('login')
  async signIn(@Body() signInDto: SignInDTO, @Res() response: express.Response) {
    const refreshToken = await this.authService.signIn(signInDto.login, signInDto.password);
    response.cookie('refresh_token', refreshToken, {
      sameSite: 'strict',
      httpOnly: true,
      expires: new Date(Date.now() + REFRESH_TOKEN_EXPIRE),
      secure: true,
    });

    const accessToken = await this.authService.refreshToken(refreshToken);
    response.cookie('access_token', accessToken, {
      sameSite: 'strict',
      httpOnly: true,
      expires: new Date(Date.now() + ACCESS_TOKEN_EXPIRE),
      secure: true,
    });

    response.status(200).json({ status: 'OK' });
  }

  @ApiCookieAuth()
  @ApiOperation({ summary: 'refresh access_token', operationId: 'refresh' })
  @Get('refresh')
  async refreshToken(@Res() response: express.Response, @Req() request: express.Request) {
    const refreshToken: string = request.cookies.refresh_token;

    const accessToken = await this.authService.refreshToken(refreshToken);
    response.cookie('access_token', accessToken, {
      sameSite: 'strict',
      httpOnly: true,
      expires: new Date(Date.now() + ACCESS_TOKEN_EXPIRE),
      secure: true,
    });

    response.status(200).json({ status: 'OK' });
  }
}
