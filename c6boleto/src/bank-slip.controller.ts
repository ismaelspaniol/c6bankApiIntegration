import * as interfaces from './interfaces';
import { Controller, Post, Body } from '@nestjs/common';
import { BankSlipService } from './bank-slip.service';

@Controller('bank-slips')
export class BankSlipController {
  constructor(private readonly bankSlipService: BankSlipService) {}

  @Post()
  async create(@Body() body: interfaces.CreateBankSlipDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.bankSlipService.createBankSlip(body);
  }
}
