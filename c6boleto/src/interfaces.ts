export interface BankReturnedResponse {
  amount: number;
  due_date: string;
  originator_id: string;
  our_number: string;
  billing_scheme: string;
  billing_type: string;
  id: string;
  bar_code: string;
  digitable_line: string;
}

export interface CreateBankSlipDto {
  bank_slip: {
    external_reference_id: string;
    amount: number;
    due_date: string;
    instructions: string[];
    discount?: {
      discount_type: string;
      first: { value: number; dead_line: number };
      second: { value: number; dead_line: number };
      third: { value: number; dead_line: number };
    };
    interest?: { type: string; value: number; dead_line: number };
    fine?: { type: string; value: number; dead_line: number };
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
  };
  data: {
    uuid: string;
    banckReturnedError?: BanckReturnedError;
    banckReturned?: BankReturnedResponse;
    production_environment: boolean;
  };
}

export interface BanckReturnedError {
  status: number;
  data: {
    type: string;
    title: string;
    status: number;
    detail: string;
    correlation_id: string;
    timestamp: string;
  };
}

interface Discount {
  discount_type: 'V';
  first: {
    value: number;
    dead_line: number;
  };
  second: {
    value: number;
    dead_line: number;
  };
  third: {
    value: number;
    dead_line: number;
  };
}

interface Interest {
  type: 'V';
  value: number;
  dead_line: number;
}

interface Fine {
  type: 'V';
  value: number;
  dead_line: number;
}

export interface UpdateBankSlipDto {
  updateSlip: {
    amount: number;
    due_date: string;
    discount: Discount;
    interest: Interest;
    fine: Fine;
  };
  data: {
    id: string;
    production_environment: boolean;
  };
}

export interface consultBankSlipDto {
  data: {
    uuid: string;
    production_environment: boolean;
  };
}
