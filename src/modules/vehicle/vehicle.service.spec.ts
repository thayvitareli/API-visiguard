import { Test, TestingModule } from '@nestjs/testing';
import { VehicleService } from './vehicle.service';
import VehicleRepository from 'src/database/repositories/vehicle.repository';

describe('VehicleService', () => {
  let service: VehicleService;
  let vehicleRepositoryMock : VehicleRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehicleService,
        {
          provide: VehicleRepository,
          useValue: {
            create: jest.fn(),
            findMany: jest.fn(),
            count: jest.fn(),
          }

        }
      ],
    }).compile();

    service = module.get<VehicleService>(VehicleService);
    vehicleRepositoryMock = module.get<VehicleRepository>(VehicleRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('shoul create a vehicle', async() => {
        const result = await service.create({
          brand:'',
          model:'',
          plate:'',
          type:1,
        })
    })
  })
});
