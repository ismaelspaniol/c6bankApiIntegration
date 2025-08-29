import { Controller, Get } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as dotenv from 'dotenv';

dotenv.config();
function encodeToBase64(clientId: string, clientSecret: string): string {
  const combined = `${clientId}:${clientSecret}`;
  const base64Encoded = Buffer.from(combined).toString('base64');
  return base64Encoded;
}

@Controller()
export class AppController {
  constructor(private readonly httpService: HttpService) {}

  @Get('users')
  getUsers() {
    return [
      { id: 1, name: 'Ismael' },
      { id: 2, name: 'Maria' },
    ];
  }

  @Get('auth')
  async getAuth() {
    const url = 'https://baas-api-sandbox.c6bank.info/v1/auth/';
    const clientSecret = process.env.CLIENT_SECRET || '';
    const clientId = process.env.CLIENT_ID || '';
    const base64Encoded = encodeToBase64(clientId, clientSecret);

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + base64Encoded,
    };

    const body = new URLSearchParams();
    body.append('grant_type', 'client_credentials');

    const response = await firstValueFrom(
      this.httpService.post(url, body.toString(), { headers }),
    );

    return response.data;
  }
}
