import { Module } from '@nestjs/common';
import { CollaboratorService } from './collaborator.service';
import { ColaboratorController } from './collaborator.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ColaboratorController],
  providers: [CollaboratorService],
})
export class CollaboratorModule {}
