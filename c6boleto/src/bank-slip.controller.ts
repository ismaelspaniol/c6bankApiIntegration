import { Controller, Post, Get, Body } from '@nestjs/common';
import { BankSlipService } from './bank-slip.service';

@Controller('bank-slips')
export class BankSlipController {
  constructor(private readonly bankSlipService: BankSlipService) {}

  @Post()
  async create(@Body() body: any) {
    return this.bankSlipService.createBankSlip(body);
  }

  @Get()
  async test() {
    const body = {
      external_reference_id: 'A999855',
      amount: 123.45,
      due_date: '2025-10-11',
      instructions: ['Não receber após o vencimento', 'str2', 'str3', 'str4'],
      discount: {
        discount_type: 'V',
        first: { value: 10, dead_line: 10 },
        second: { value: 5, dead_line: 8 },
        third: { value: 3, dead_line: 7 },
      },
      interest: { type: 'V', value: 10, dead_line: 10 },
      fine: { type: 'V', value: 10, dead_line: 10 },
      billing_scheme: '21',
      our_number: '3048',
      payer: {
        name: 'Ismael Rodrigo Spaniol',
        tax_id: '03163193099',
        email: 'pagador@email.com.br',
        address: {
          street: 'Av. Nove de Julho',
          number: 123,
          complement: 'Complemento',
          city: 'Rio de Janeiro',
          state: 'RJ',
          zip_code: '05093000',
        },
      },
    };
      //{"amount":123.45,"due_date":"2025-10-11","originator_id":"000004965465","our_number":"0009884490","billing_scheme":"21","billing_type":"3","id":"01K3VNYQPCT8282EHP59FKZAXA","bar_code":"33699123100000123450000049654650009884490213","digitable_line":"33690.00009   49654.650008   98844.902134   9   12310000012345"}
      

    //   {"amount":123.45,"due_date":"2025-10-11","originator_id":"000004965465","our_number":"0009884580","billing_scheme":"21","billing_type":"3","id":"01K3VPK9H3TYMH75MXXYTZ3XMH","bar_code":"33698123100000123450000049654650009884580213","digitable_line":"33690.00009   49654.650008   98845.802135   8   12310000012345"}
    return this.bankSlipService.createBankSlip(body);
  }
}
