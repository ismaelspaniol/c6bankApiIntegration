import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';
import * as dotenv from 'dotenv';
import { BankSlipDbService } from './bank-slipdb.service';
import {
  BanckReturnedError,
  BankReturnedResponse,
  consultBankSlipDto,
  CreateBankSlipDto,
  UpdateBankSlipDto,
} from './interfaces';
import { getApiUrl } from './functions';

dotenv.config();
@Injectable()
export class BankSlipService {
  constructor(
    private readonly httpService: HttpService,
    private readonly authService: AuthService,
    private readonly bankSlipDbService: BankSlipDbService,
  ) {}

  async createBankSlip(data: CreateBankSlipDto) {
    const token = await this.authService.getToken(
      data.data.production_environment,
    );

    const url = getApiUrl(data.data.production_environment) + 'v1/bank_slips/';
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Partner-Software-Name': 'Super PDV',
      'Partner-Software-Version': '1.0.0',
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, data.bank_slip, { headers }),
      );

      data.data.banckReturned = response.data as BankReturnedResponse;
      await this.bankSlipDbService.upInsertBankSlip(data);

      return {
        status: HttpStatus.OK,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data: response.data,
      };
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.response && error.response.status === 400) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        data.data.banckReturnedError = error.response
          .data as BanckReturnedError;
        await this.bankSlipDbService.upInsertBankSlip(data);

        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            data: error.response.data,
          },
          HttpStatus.OK,
        );
      }
      throw error; // Re-throw other errors
    }
  }

  async updateBankSlip(data: UpdateBankSlipDto) {
    const token = await this.authService.getToken(
      data.data.production_environment,
    );

    const url =
      getApiUrl(data.data.production_environment) +
      'v1/bank_slips/' +
      data.data.id;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Partner-Software-Name': 'Super PDV',
      'Partner-Software-Version': '1.0.0',
    };

    try {
      const response = await firstValueFrom(
        this.httpService.put(url, data.updateSlip, { headers }),
      );

      console.log(response.data);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return response.data;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.response && error.response.status === 400) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.log(error.response.data);

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

  async consultBankSlip(uuid: string, production_environment: boolean) {
    const token = await this.authService.getToken(production_environment);

    console.log(uuid);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const id = await this.bankSlipDbService.getidBankSlip(uuid);
    console.log(id);
    if (!id) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          data: {
            type: 'Not Found',
            title: 'Bank slip not found',
            status: HttpStatus.NOT_FOUND,
            detail: 'No bank slip found for the provided UUID',
            correlation_id: '',
            timestamp: new Date().toISOString(),
          },
        },
        HttpStatus.OK,
      );
    }
    const url = getApiUrl(production_environment) + 'v1/bank_slips/' + id;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Partner-Software-Name': 'Super PDV',
      'Partner-Software-Version': '1.0.0',
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, { headers }),
      );

      const data = {
        status: HttpStatus.OK,
        data: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          base64_pdf_file: response.data.base64_pdf_file,
        },
      };
      console.log(data);

      return data;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.response && error.response.status === 400) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.log(error.response.data);

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

  async cancelBankSlip(body: consultBankSlipDto) {
    const token = await this.authService.getToken(
      body.data.production_environment,
    );

    const url =
      getApiUrl(body.data.production_environment) +
      'v1/bank_slips/' +
      body.data.uuid +
      'cancel';
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Partner-Software-Name': 'Super PDV',
      'Partner-Software-Version': '1.0.0',
    };

    try {
      const response = await firstValueFrom(
        this.httpService.put(url, { headers }),
      );

      console.log(response.data);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return response.data;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.response && error.response.status === 400) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.log(error.response.data);

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
