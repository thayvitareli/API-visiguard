import { Module } from '@nestjs/common';
import { ColaboratorService } from './colaborator.service';
import { ColaboratorController } from './colaborator.controller';

@Module({
  controllers: [ColaboratorController],
  providers: [ColaboratorService],
})
export class ColaboratorModule {}
