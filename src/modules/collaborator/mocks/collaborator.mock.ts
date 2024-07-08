import { Collaborator } from '../entities/collaborator.entity';

export const collaboratorsMock: Collaborator[] = [
  {
    id: 1,
    name: 'colaborador 1',
    register_employ: '643h9o',
    position: 1,
    department: 2,
    created_at: new Date('2024-04-17T18:22:22.689Z'),
    updated_at: new Date('2024-04-17T18:22:22.689Z'),
  },
  {
    id: 2,
    name: 'colaborador 2',
    register_employ: '12i83o',
    position: 2,
    department: 3,
    created_at: new Date('2024-04-17T18:22:22.689Z'),
    updated_at: new Date('2024-04-17T18:22:22.689Z'),
  },
];

export const findManyMock = {
  records: collaboratorsMock,
  total: collaboratorsMock.length,
};

export const totalMock = collaboratorsMock.length;
