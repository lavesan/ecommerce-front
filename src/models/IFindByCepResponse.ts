export interface IFindByCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string; // In short name
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}
