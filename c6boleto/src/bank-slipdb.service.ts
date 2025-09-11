import { CreateBankSlipDto } from './interfaces';
import { Injectable } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class BankSlipDbService {
  constructor() {}

  async upInsertBankSlip(body: CreateBankSlipDto) {
    console.log(body);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const bankSlip = await prisma.bankSlip.upsert({
      where: {
        uuid: body.data.uuid, // Match by UUID
      },
      update: {
        externalReferenceId: body.bank_slip.external_reference_id,
        amount: body.bank_slip.amount,
        dueDate: new Date(body.bank_slip.due_date),
        instructions: body.bank_slip.instructions,
        discount: body.bank_slip.discount,
        interest: body.bank_slip.interest,
        fine: body.bank_slip.fine,
        billingScheme: body.bank_slip.billing_scheme,
        ourNumber: body.bank_slip.our_number,
        payerName: body.bank_slip.payer.name,
        payerTaxId: body.bank_slip.payer.tax_id,
        payerEmail: body.bank_slip.payer.email,
        payerAddress: body.bank_slip.payer.address,
        banckReturned: body.data.banckReturned
          ? { ...body.data.banckReturned }
          : undefined,
        banckReturnedError: body.data.banckReturnedError
          ? { ...body.data.banckReturnedError }
          : undefined,
      },
      create: {
        externalReferenceId: body.bank_slip.external_reference_id,
        amount: body.bank_slip.amount,
        dueDate: new Date(body.bank_slip.due_date),
        instructions: body.bank_slip.instructions,
        discount: body.bank_slip.discount,
        interest: body.bank_slip.interest,
        fine: body.bank_slip.fine,
        billingScheme: body.bank_slip.billing_scheme,
        ourNumber: body.bank_slip.our_number,
        payerName: body.bank_slip.payer.name,
        payerTaxId: body.bank_slip.payer.tax_id,
        payerEmail: body.bank_slip.payer.email,
        payerAddress: body.bank_slip.payer.address,
        uuid: body.data.uuid, // Create with UUID
        banckReturned: body.data.banckReturned
          ? { ...body.data.banckReturned }
          : undefined,
        banckReturnedError: body.data.banckReturnedError
          ? { ...body.data.banckReturnedError }
          : undefined,
      },
    });
  }
}
