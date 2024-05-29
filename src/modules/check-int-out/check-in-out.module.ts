import { Module } from '@nestjs/common';
import { CheckIntOutService } from './check-in-out.service';
import { CheckIntOutController } from './check-in-out.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[DatabaseModule],
  controllers: [CheckIntOutController],
  providers: [CheckIntOutService],
})
export class CheckIntOutModule {}
