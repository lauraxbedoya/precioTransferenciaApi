import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUnknownUserDto } from '../user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/google')
  async googleUser(@Body() body: CreateUnknownUserDto) {
    const user = await this.userService.findUpdateOrCreate(body);
    return this.authService.login(user);
  }
}