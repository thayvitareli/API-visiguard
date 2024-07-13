import { Module } from '@nestjs/common';
import { SuplierService } from './suplier.service';
import { SuplierController } from './suplier.controller';
import { DatabaseModule } from '../../../src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SuplierController],
  providers: [SuplierService],
})
export class SuplierModule {}
