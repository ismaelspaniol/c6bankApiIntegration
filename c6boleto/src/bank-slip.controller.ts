import * as interfaces from './interfaces';
import { Controller, Post, Body, Put, Param, Get } from '@nestjs/common';
import { BankSlipService } from './bank-slip.service';

@Controller('bank-slips')
export class BankSlipController {
  constructor(private readonly bankSlipService: BankSlipService) {}

  @Post()
  async create(@Body() body: interfaces.CreateBankSlipDto) {
    if (body.data.production_environment === false) {
      body.bank_slip.billing_scheme = '21';
    } else {
      body.bank_slip.billing_scheme = '15';
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.bankSlipService.createBankSlip(body);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: interfaces.UpdateBankSlipDto,
  ) {
    body.data.id = id;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.bankSlipService.updateBankSlip(body);
  }

  @Post(':id')
  async consultSlip(
    @Param('id') id: string,
    @Body() body: interfaces.consultBankSlipDto,
  ) {
    body.data.id = id;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.bankSlipService.consultBankSlip(body);
  }

  @Post(':id')
  async cancelSlip(
    @Param('id') id: string,
    @Body() body: interfaces.consultBankSlipDto,
  ) {
    body.data.id = id;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.bankSlipService.cancelBankSlip(body);
  }
}
