import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import * as fs from 'fs';
import * as https from 'https';
import { AuthService } from './auth.service';
import { BankSlipService } from './bank-slip.service';
import { BankSlipController } from './bank-slip.controller';
import { BankSlipDbService } from './bank-slipdb.service';

@Module({
  imports: [
    HttpModule.register({
      httpsAgent: new https.Agent({
        cert: fs.readFileSync('certs/crt.crt'),
        key: fs.readFileSync('certs/key.key'),
        // se precisar incluir também a CA raiz/intermediária:
        // ca: fs.readFileSync('certs/ca.crt'),
        rejectUnauthorized: true, // valida o certificado do servidor
      }),
    }),
  ],
  controllers: [AppController, BankSlipController],
  providers: [AppService, AuthService, BankSlipService, BankSlipDbService],
})
export class AppModule {}
