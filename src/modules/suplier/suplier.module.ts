import { Module } from '@nestjs/common';
import { SuplierService } from './suplier.service';
import { SuplierController } from './suplier.controller';

@Module({
  controllers: [SuplierController],
  providers: [SuplierService],
})
export class SuplierModule {}
