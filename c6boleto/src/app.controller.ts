import { Controller, Get } from '@nestjs/common';

import * as dotenv from 'dotenv';
import { AuthService } from './auth.service';

dotenv.config();

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get('users')
  getUsers() {
    return [
      { id: 1, name: 'Ismael' },
      { id: 2, name: 'Maria' },
    ];
  }

  // @Get('auth')
  // async auth() {
  //   const token = await this.authService.getToken();
  //   return { token };
  // }
}
