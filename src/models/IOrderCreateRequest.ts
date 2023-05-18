import { PaymentType } from "@/enums/PaymentType.enum";

export interface IOrderCreateAdditional {
  id: string;
  value: number;
  quantity: number;
}

export interface IOrderCreateRequest {
  freightValue: number;
  productsValue: number;
  paymentType: PaymentType;
  moneyExchange?: number;
  enterpriseId: string;
  freightId: string;
  clientId: string;
  products: {
    id: string;
    quantity: number;
    value: number;
    points: number;
    additionals: IOrderCreateAdditional[];
  }[];
  address: {
    cep: string;
    street: string;
    complement?: string;
    number: string;
    district: string;
    state: string;
    city: string;
    shortName?: string;
  };
}
