import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BankSlipService {
  constructor(
    private readonly httpService: HttpService,
    private readonly authService: AuthService,
  ) {}

  async createBankSlip(data: any) {
    const token = await this.authService.getToken();

    const url = 'https://baas-api-sandbox.c6bank.info/v1/bank_slips/';
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Partner-Software-Name': 'Super PDV',
      'Partner-Software-Version': '1.0.0',
    };

    const response = await firstValueFrom(
      this.httpService.post(url, data, { headers }),
    );

    return response.data;
  }
}
