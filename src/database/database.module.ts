import { PrismaService } from './prisma/prisma.service';
import { Module } from '@nestjs/common';
import UserRepository from './repositories/user.repository';

@Module({
  exports: [UserRepository],
  providers: [PrismaService, UserRepository],
})
export class DatabaseModule {}
