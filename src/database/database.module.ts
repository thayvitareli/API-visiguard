import { PrismaService } from './prisma/prisma.service';
import { Module } from '@nestjs/common';
import UserRepository from './repositories/user.repository';
import VehicleRepository from './repositories/vehicle.repository';

@Module({
  exports: [UserRepository,VehicleRepository],
  providers: [PrismaService, UserRepository,VehicleRepository],
})
export class DatabaseModule {}

