export interface Endereco {
  rua: string;
  numero: number;
  complemento: string;
  cidade: string;
  estado: string;
  cep: string;
}

export interface DescontoDetalhe {
  valor: number;
  limite_dias: number;
}

export interface Desconto {
  tipo: string;
  primeiro: DescontoDetalhe;
  segundo: DescontoDetalhe;
  terceiro: DescontoDetalhe;
}

export interface Juros {
  tipo: string;
  valor: number;
  limite_dias: number;
}

export interface Pagador {
  nome: string;
  documento: string;
  email: string;
  endereco: Endereco;
}
export interface Fatura {
  referencia_externa: string;
  valor: number;
  data_vencimento: string; // ou Date, se for ser convertido
  esquema_cobranca: string;
  nosso_numero: string;
  banco: string;
  instrucoes: string[];
  desconto: Desconto;
  juros: Juros;
  documento: string;
  email: string;
  pagador: Pagador;
  uuid: string;
}
