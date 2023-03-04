import { Injectable, Res } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const { password, ...result } = await this.usersService.findOneByUsername(
      username,
    );
    const isValidUser = await bcrypt.compare(pass, password);
    if (isValidUser) {
      return result;
    }
    return null;
  }

  async login(user: any, @Res({ passthrough: true }) res: Response) {
    const payload = { username: user.username, sub: user.userId };
    const access_token = this.jwtService.sign(payload);

    res.cookie('auth_token', access_token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      path: '/',
    });
    res.cookie('auth_token_user', payload, {
      httpOnly: false,
      sameSite: 'none',
      secure: true,
      path: '/',
    });
    return { msg: 'Success' };
  }

  async logout(res: Response) {
    res.clearCookie('auth_token', { expires: new Date(Date.now()) });
    res.clearCookie('auth_token_user', { expires: new Date(Date.now()) });
    return { msg: 'Succesfully logout' };
  }
}
