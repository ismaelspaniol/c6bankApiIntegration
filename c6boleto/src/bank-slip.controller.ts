import * as interfaces from './interfaces';
import { Controller, Post, Body, Put, Param } from '@nestjs/common';
import { BankSlipService } from './bank-slip.service';
import * as interfacesBoleto from './interfaceDTOBoleto';

@Controller('bank-slips')
export class BankSlipController {
  constructor(private readonly bankSlipService: BankSlipService) {}

  @Post()
  async create(@Body() body: interfacesBoleto.Fatura) {
    // console.log(body);

    const newBankSlip: interfaces.CreateBankSlipDto = {
      bank_slip: {
        external_reference_id: body.referencia_externa,
        amount: body.valor,
        due_date: body.data_vencimento,
        instructions: body.instrucoes,
        billing_scheme: '21', // 21 - sandbox, 15 - produção
        our_number: body.nosso_numero,
        payer: {
          name: body.pagador.nome, // Ajustar conforme necessário
          tax_id: body.pagador.documento,
          email: body.pagador.email,
          address: {
            street: body.pagador.endereco.rua,
            number: body.pagador.endereco.numero,
            complement: body.pagador.endereco.complemento,
            city: body.pagador.endereco.cidade,
            state: body.pagador.endereco.estado,
            zip_code: body.pagador.endereco.cep,
          },
        },
      },
      data: {
        uuid: body.uuid, // Gerar ou receber conforme necessário
        production_environment: false, // Ajustar conforme necessário
      },
    };

    // console.log(newBankSlip);

    return await this.bankSlipService.createBankSlip(newBankSlip);
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

  @Post(':uuid')
  async consultSlip(@Param('uuid') uuid: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.bankSlipService.consultBankSlip(uuid, false);
  }

  @Post(':id')
  async cancelSlip(
    @Param('id') id: string,
    @Body() body: interfaces.consultBankSlipDto,
  ) {
    body.data.uuid = id;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.bankSlipService.cancelBankSlip(body);
  }
}
