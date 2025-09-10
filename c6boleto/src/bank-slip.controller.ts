import { Controller, Post, Body } from '@nestjs/common';
import { BankSlipService } from './bank-slip.service';
import { PrismaClient } from '@prisma/client';

interface CreateBankSlipDto {
  external_reference_id: string;
  amount: number;
  due_date: string;
  instructions: string[];
  discount: {
    discount_type: string;
    first: { value: number; dead_line: number };
    second: { value: number; dead_line: number };
    third: { value: number; dead_line: number };
  };
  interest: { type: string; value: number; dead_line: number };
  fine: { type: string; value: number; dead_line: number };
  billing_scheme: string;
  our_number: string;
  payer: {
    name: string;
    tax_id: string;
    email: string;
    address: {
      street: string;
      number: number;
      complement: string;
      city: string;
      state: string;
      zip_code: string;
    };
  };
}
const prisma = new PrismaClient();
@Controller('bank-slips')
export class BankSlipController {
  constructor(private readonly bankSlipService: BankSlipService) {}

  @Post()
  async create(@Body() body: CreateBankSlipDto) {
    const bankSlip = await prisma.bankSlip.create({
      data: {
        externalReferenceId: body.external_reference_id,
        amount: body.amount,
        dueDate: new Date(body.due_date),
        instructions: body.instructions,
        discount: body.discount,
        interest: body.interest,
        fine: body.fine,
        billingScheme: body.billing_scheme,
        ourNumber: body.our_number,
        payerName: body.payer.name,
        payerTaxId: body.payer.tax_id,
        payerEmail: body.payer.email,
        payerAddress: body.payer.address,
      },
    });
    return this.bankSlipService.createBankSlip(body);
  }
}
