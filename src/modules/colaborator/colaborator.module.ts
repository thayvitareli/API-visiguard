import { Module } from '@nestjs/common';
import { ColaboratorService } from './colaborator.service';
import { ColaboratorController } from './colaborator.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ColaboratorController],
  providers: [ColaboratorService],
})
export class ColaboratorModule {}
