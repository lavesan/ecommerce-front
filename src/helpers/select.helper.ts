import { ISelectData } from "@/models/components/ISelectData";

const districts = [
  "Boa esperança",
  "Boa Vista",
  "Alto do Cardeal",
  "Centro",
  "Cidade Jardim",
  "Cohab",
  "Cohab",
  "Coliseu",
  "Condomínio Morada do sol",
  "Conjunto novo Arcoverde",
  "Coronel Siqueira Campos",
  "Cruzeiro",
  "Loteamento Anchieta dali",
  "Loteamento arco íris",
  "LOTEAMENTO JARDIM DA SERRA",
  "Loteamento Arcoville",
  "Loteamento Petrópolis",
  "Loteamento Petrópolis 2",
  "Loteamento Rocha",
  "Loteamento Teresópolis",
  "Loteamento Veraneio",
  "Maria de Fátima",
  "Por do sol",
  "RESIDENCIAL DIVINA MISERICÓRDIA",
  "Santa Luzia",
  "Santos Drumond",
  "São Cristóvão",
  "são Geraldo",
  "São Miguel",
  "Sucupira",
  "Tamboril",
  "Vila cardeal arcoverde",
];

export const districtOptions: ISelectData[] = districts.map((district) => ({
  label: district,
  value: district,
}));

export const exchangeNotesOpts: ISelectData[] = [
  {
    label: "R$ 2,00",
    value: 200,
  },
  {
    label: "R$ 5,00",
    value: 500,
  },
  {
    label: "R$ 10,00",
    value: 1000,
  },
  {
    label: "R$ 20,00",
    value: 2000,
  },
  {
    label: "R$ 50,00",
    value: 5000,
  },
  {
    label: "R$ 100,00",
    value: 10000,
  },
  {
    label: "R$ 200,00",
    value: 20000,
  },
];
