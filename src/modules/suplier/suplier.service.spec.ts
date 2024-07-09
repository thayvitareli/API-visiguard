import { Test, TestingModule } from '@nestjs/testing';
import { SuplierService } from './suplier.service';
import UserRepository from '../../database/repositories/user.repository';
import SuplierRepository from 'src/database/repositories/suplier.respository';
import {
  createSuplierDto,
  findUserMock,
  listSuplierMock,
} from './mocks/suplier.mock';
import {
  BadRequestException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';

describe('SuplierService', () => {
  let suplierService: SuplierService;
  let userRepositoryMock: UserRepository;
  let suplierRepositoryMock: SuplierRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SuplierService,
        {
          provide: UserRepository,
          useValue: {
            findOne: jest.fn().mockResolvedValue(findUserMock),
          },
        },
        {
          provide: SuplierRepository,
          useValue: {
            create: jest.fn().mockResolvedValue({
              ...createSuplierDto,
              id: 5,
              created_at: new Date(),
              updated_at: new Date(),
            }),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    suplierService = module.get<SuplierService>(SuplierService);
    suplierRepositoryMock = module.get<SuplierRepository>(SuplierRepository);

    userRepositoryMock = module.get<UserRepository>(UserRepository);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(suplierService).toBeDefined();
  });

  describe('Create', () => {
    it('Should create a Suplier', async () => {
      jest.spyOn(suplierRepositoryMock, 'findOne').mockResolvedValueOnce(null);
      const result = await suplierService.create(createSuplierDto, 1);

      expect(result).toEqual({
        ...createSuplierDto,
        id: expect.any(Number),
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      });
    });

    it('Should throw an error - unauthenticated', async () => {
      jest.spyOn(userRepositoryMock, 'findOne').mockResolvedValueOnce(null);

      await suplierService.create(createSuplierDto, 1).catch((error) => {
        expect(error).toBeInstanceOf(UnauthorizedException);
      });
    });

    it('Should throw an error - access permission denied', async () => {
      jest
        .spyOn(userRepositoryMock, 'findOne')
        //@ts-ignore
        .mockResolvedValueOnce({ ...findUserMock, privilege: 0 });

      await suplierService.create(createSuplierDto, 1).catch((error) => {
        expect(error).toBeInstanceOf(ForbiddenException);
      });
    });

    it('Should throw an error - CNPJ already registered', async () => {
      jest
        .spyOn(suplierRepositoryMock, 'findOne')
        //@ts-ignore
        .mockResolvedValueOnce(listSuplierMock[0]);

      await suplierService
        .create({ ...createSuplierDto, CNPJ: '123231234000110' }, 1)
        .catch((error) => {
          expect(error).toBeInstanceOf(BadRequestException);
        });
    });
  });
});
