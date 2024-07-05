import { Test, TestingModule } from '@nestjs/testing';
import { ColaboratorController } from './collaborator.controller';
import { ColaboratorService } from './collaborator.service';
import { CreateColaboratorDto } from './dto/create-colaborator.dto';

describe('ColaboratorController', () => {
  let collaboratorControler: ColaboratorController;
  let collaboratorServiceMock: ColaboratorService;

  const values = {
    total: 2,
    records: [
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
 }
  ]
  }

  const createCollaboratorDto: CreateColaboratorDto = {
    name: 'Thainy Vitareli',
    departament:1,
    position:1,
    register_employee:"0x001"
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColaboratorController],
      providers: [{
        provide: ColaboratorService,
      useValue: {
        create: jest.fn().mockResolvedValue(
          {
            id: 2,
            ...createCollaboratorDto,
            created_at: new Date(),
            updated_at: new Date(),
          }
        ),
        findAll: jest.fn().mockResolvedValue(values)
      }}]
    }).compile();

    collaboratorControler = module.get<ColaboratorController>(ColaboratorController);
    collaboratorServiceMock = module.get<ColaboratorService>(ColaboratorService);
  });

  it('should be defined', () => {
    expect(collaboratorControler).toBeDefined();
  });

  describe('create',  () => {
    it('should create a collaborator',async () => {
      const req = {
        user: {
          userId: 1,
        }
      }

    
      const result = await collaboratorControler.create(createCollaboratorDto,req)
      
      expect(result).toEqual({
        id: expect.any(Number),
        ...createCollaboratorDto,
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      })
    })
  })


  describe('find all', () => {
    it('should return a list of collaborators and total', async () => {
      const result = await collaboratorControler.findAll({ search:'', skip:0, take:2})

      expect(result).toEqual(values)
    })
  })
})
