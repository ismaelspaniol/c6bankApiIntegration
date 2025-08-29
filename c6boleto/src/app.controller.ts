import { Controller, Get } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as dotenv from 'dotenv';
import { AuthService } from './auth.service';

dotenv.config();
function encodeToBase64(clientId: string, clientSecret: string): string {
  const combined = `${clientId}:${clientSecret}`;
  const base64Encoded = Buffer.from(combined).toString('base64');
  return base64Encoded;
}

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

  @Get('auth')
  async auth() {
    const token = await this.authService.getToken();
    return { token };
  }
}
