import { Test, TestingModule } from '@nestjs/testing';
import { CheckIntOutService } from './check-in-out.service';

describe('CheckIntOutService', () => {
  let service: CheckIntOutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckIntOutService],
    }).compile();

    service = module.get<CheckIntOutService>(CheckIntOutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
