import { CreateSuplierDto } from '../dto/create-suplier.dto';

export const createSuplierDto: CreateSuplierDto = {
  CNPJ: '123231234000110',
  name: 'Fornecedor 2',
  phone: '1945679090',
};

export const findUserMock = {
  id: 1,
  name: 'colaborador 1',
  password: 'disad99dasdias',
  CPF: '21111111190',
  privilege: 1,
  created_at: new Date('2024-04-17T18:22:22.689Z'),
  updated_at: new Date('2024-04-17T18:22:22.689Z'),
};

export const listSuplierMock = [
  {
    id: 1,
    CNPJ: '123231234000110',
    name: 'Fornecedor 1',
    phone: '1945679098',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    CNPJ: '555231234000111',
    name: 'Fornecedor 1',
    phone: '1945679098',
    created_at: new Date(),
    updated_at: new Date(),
  },
];
