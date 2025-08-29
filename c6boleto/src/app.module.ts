import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import * as fs from 'fs';
import * as https from 'https';
import { AuthService } from './auth.service';

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
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
