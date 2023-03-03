import { Controller, Request, Post, UseGuards, Res, Get } from '@nestjs/common';
import { Response } from 'express';
import { Public } from './auth.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(req.user, res);
  }

  @Get('auth/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }
}
