import { Test, TestingModule } from '@nestjs/testing';
import { SuplierController } from './suplier.controller';
import { SuplierService } from './suplier.service';

describe('SuplierController', () => {
  let controller: SuplierController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuplierController],
      providers: [SuplierService],
    }).compile();

    controller = module.get<SuplierController>(SuplierController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
