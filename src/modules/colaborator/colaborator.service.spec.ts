import { Test, TestingModule } from '@nestjs/testing';
import { ColaboratorService } from './colaborator.service';

describe('ColaboratorService', () => {
  let service: ColaboratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColaboratorService],
    }).compile();

    service = module.get<ColaboratorService>(ColaboratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
