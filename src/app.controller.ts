import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './api/user/auth/auth.service';
import { JwtAuthGuard } from './api/user/auth/jwt-auth.guard';
import { LocalAuthGuard } from './api/user/auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}