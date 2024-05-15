import { Test, TestingModule } from '@nestjs/testing';
import { ColaboratorController } from './colaborator.controller';
import { ColaboratorService } from './colaborator.service';

describe('ColaboratorController', () => {
  let controller: ColaboratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColaboratorController],
      providers: [ColaboratorService],
    }).compile();

    controller = module.get<ColaboratorController>(ColaboratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
