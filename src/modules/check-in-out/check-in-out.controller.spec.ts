import { Test, TestingModule } from '@nestjs/testing';
import { CheckIntOutController } from './check-in-out.controller';
import { CheckIntOutService } from './check-in-out.service';

describe('CheckIntOutController', () => {
  let controller: CheckIntOutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckIntOutController],
      providers: [CheckIntOutService],
    }).compile();

    controller = module.get<CheckIntOutController>(CheckIntOutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
