import { Test, TestingModule } from '@nestjs/testing';
import { ColaboratorService } from './colaborator.service';
import UserRepository from '../../database/repositories/user.repository';
import CollaboratorRepository from '../../database/repositories/collaborator.repository';
import { CreateColaboratorDto } from './dto/create-colaborator.dto';
import { Collaborator } from './entities/collaborator.entity';
import { BadRequestException, ForbiddenException } from '@nestjs/common';

describe('ColaboratorService', () => {
  let collaboratorService: ColaboratorService;
  let mockUserRepository: UserRepository;
  let mockCollaboratorRepository: CollaboratorRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ColaboratorService,
        {
          provide: UserRepository,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: CollaboratorRepository,
          useValue: {
            findMany: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            count: jest.fn(),
          },
        },
      ],
    }).compile();

    collaboratorService = module.get<ColaboratorService>(ColaboratorService);
    mockUserRepository = module.get<UserRepository>(UserRepository);
    mockCollaboratorRepository = module.get<CollaboratorRepository>(
      CollaboratorRepository,
    );
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(collaboratorService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of collaborators', async () => {
      const records: Collaborator[] = [
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

      jest
        .spyOn(mockCollaboratorRepository, 'findMany')
        .mockImplementation(() => Promise.resolve(records as any));

      jest
        .spyOn(collaboratorService, 'findAll')
        .mockImplementation(() => Promise.resolve({ total: 2, records }));

      expect(
        await collaboratorService.findAll({
          search: '',
          skip: 0,
          take: 10,
        }),
      ).toEqual({ total: expect.any(Number), records });
    });

    it('should return an empty list of collaborators', async () => {
      const records: Collaborator[] = [];

      jest
        .spyOn(mockCollaboratorRepository, 'findMany')
        .mockImplementation(() => Promise.resolve([]));

      jest
        .spyOn(collaboratorService, 'findAll')
        .mockImplementation(() => Promise.resolve({ total: 0, records }));

      expect(
        await collaboratorService.findAll({
          search: '',
          skip: 0,
          take: 10,
        }),
      ).toEqual({
        total: expect.any(Number),
        records: expect.arrayContaining([]),
      });
    });
  });

  describe('create', () => {
    it('should create a collaborator', async () => {
      const data: CreateColaboratorDto = {
        name: 'colaborador 1',
        register_employee: '643h9o',
        position: 1,
        departament: 2,
      };

      const userId = 1;

      jest.spyOn(mockUserRepository, 'findOne').mockImplementation(() =>
        Promise.resolve({
          id: 1,
          name: 'colaborador 1',
          password: 'disad99dasdias',
          CPF: '21111111190',
          privilege: 1,
          created_at: new Date('2024-04-17T18:22:22.689Z'),
          updated_at: new Date('2024-04-17T18:22:22.689Z'),
        } as any),
      );

      jest
        .spyOn(mockCollaboratorRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(null));

      jest.spyOn(mockCollaboratorRepository, 'create').mockImplementation(() =>
        Promise.resolve({
          ...data,
          register_employ: data.register_employee,
          department: data.departament,
          id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        }),
      );

      expect(await collaboratorService.create(data, userId)).toEqual(
        expect.objectContaining({
          ...data,
          id: expect.any(Number),
          created_at: expect.any(Date),
          updated_at: expect.any(Date),
        }),
      );
    });

    it('should throw an exception if the user does not have access privilege', async () => {
      const data: CreateColaboratorDto = {
        name: 'colaborador 1',
        register_employee: '643h9o',
        position: 1,
        departament: 2,
      };

      const userId = 1;

      jest.spyOn(mockUserRepository, 'findOne').mockImplementation(() =>
        Promise.resolve(
          Promise.resolve({
            id: 1,
            name: 'colaborador 1',
            password: 'disad99dasdias',
            CPF: '21111111190',
            privilege: 0,
            created_at: new Date('2024-04-17T18:22:22.689Z'),
            updated_at: new Date('2024-04-17T18:22:22.689Z'),
          } as any),
        ),
      );

      jest
        .spyOn(mockCollaboratorRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(null));

      await collaboratorService.create(data, userId).catch((error) => {
        expect(error?.message).toBe(
          'Acesso Negado. Você não possui acesso a essa função',
        );
        expect(error).toBeInstanceOf(ForbiddenException);
      });

      expect(mockCollaboratorRepository.create).toHaveBeenCalledTimes(0);
    });

    it('should throw an exception if there is already exist register_employee', async () => {
      const data: CreateColaboratorDto = {
        name: 'colaborador 1',
        register_employee: '643h9o',
        position: 1,
        departament: 2,
      };

      const userId = 1;

      jest.spyOn(mockUserRepository, 'findOne').mockImplementation(() =>
        Promise.resolve({
          id: 1,
          name: 'colaborador 1',
          password: 'disad99dasdias',
          CPF: '21111111190',
          privilege: 1,
          created_at: new Date('2024-04-17T18:22:22.689Z'),
          updated_at: new Date('2024-04-17T18:22:22.689Z'),
        } as any),
      );

      jest.spyOn(mockCollaboratorRepository, 'findOne').mockImplementation(() =>
        Promise.resolve({
          name: 'colaborador 3',
          register_employee: '643h9o',
          position: 1,
          departament: 2,
          created_at: new Date(),
          updated_at: new Date(),
        } as any),
      );

      await collaboratorService.create(data, userId).catch((error) => {
        expect(error?.message).toBe('Registro de colaborador já cadastrado');
        expect(error).toBeInstanceOf(BadRequestException);
      });

      expect(mockCollaboratorRepository.create).toHaveBeenCalledTimes(0);
    });
  });
});
