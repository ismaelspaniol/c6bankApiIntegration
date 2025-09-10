import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AuthService } from './auth.service';
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

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, data, { headers }),
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return response.data;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.response && error.response.status === 400) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            data: error.response.data,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw error; // Re-throw other errors
    }
  }
}
