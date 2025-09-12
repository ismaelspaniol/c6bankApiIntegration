/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ClasstribService {
  constructor(private readonly httpService: HttpService) {}

  async getClassTrib() {
    const url = 'https://dfe-portal.svrs.rs.gov.br/DFE/ClassificacaoTributaria';

    const response = await firstValueFrom(
      this.httpService.get(url, { responseType: 'text' }),
    );

    const html = response.data as string;

    // Regex para capturar o conteúdo de var dadosOriginais = [...]
    const regex = /var\s+dadosOriginais\s*=\s*(\[[\s\S]*?\]);/;
    const match = html.match(regex);

    if (!match) {
      throw new Error('dadosOriginais não encontrado na página');
    }

    const dados = JSON.parse(match[1]);

    // Extrai só as ClassificacoesTributarias
    const todasClassificacoes: any[] = [];
    for (const item of dados) {
      if (Array.isArray(item.ClassificacoesTributarias)) {
        todasClassificacoes.push(...item.ClassificacoesTributarias);
      }
    }

    // Remove campos indesejados (Anexos vazios, CstNavigation, etc.)
    const limpar = (obj: any) => {
      if (Array.isArray(obj)) {
        return obj.map(limpar);
      } else if (typeof obj === 'object' && obj !== null) {
        const novo: any = {};
        for (const [k, v] of Object.entries(obj)) {
          // Remove completamente "Anexos"
          if (k === 'Anexos') continue;
          // Remove completamente "CstNavigation"
          if (k === 'CstNavigation') continue;
          novo[k] = limpar(v);
        }
        return novo;
      }
      return obj;
    };
    const totalCodClassTrib = todasClassificacoes.length;
    console.log('Total CodClassTrib:', totalCodClassTrib);
    return limpar(todasClassificacoes);
    // return JSON.parse(match[1]);
  }
}
