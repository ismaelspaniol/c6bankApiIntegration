import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as dotenv from 'dotenv';
import { getApiUrl } from './functions';
import { CreateBankSlipDto } from './interfaces';

function encodeToBase64(clientId: string, clientSecret: string): string {
  const combined = `${clientId}:${clientSecret}`;
  const base64Encoded = Buffer.from(combined).toString('base64');
  return base64Encoded;
}

interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

dotenv.config();

@Injectable()
export class AuthService {
  private token: string | null = null;
  private tokenExpiration: number = 0; // timestamp em ms

  constructor(private readonly httpService: HttpService) {}

  async getToken(data: CreateBankSlipDto): Promise<string> {
    const now = Date.now();

    // se ainda tem token válido, retorna
    if (this.token && now < this.tokenExpiration) {
      return this.token;
    }

    const clientSecret = process.env.CLIENT_SECRET || '';
    const clientId = process.env.CLIENT_ID || '';
    const base64Encoded = encodeToBase64(clientId, clientSecret);

    // buscar novo token
    const url = getApiUrl(data.data.production_environment) + 'v1/auth/';
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + base64Encoded,
    };

    const body = new URLSearchParams({ grant_type: 'client_credentials' });

    const response = await firstValueFrom(
      this.httpService.post<AuthResponse>(url, body.toString(), { headers }),
    );

    // salva token em memória por 9 minutos
    this.token = response.data.access_token;
    this.tokenExpiration = now + 9 * 60 * 1000;

    return this.token;
  }
}
