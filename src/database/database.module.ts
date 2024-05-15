import { PrismaService } from './prisma/prisma.service';
import { Module } from '@nestjs/common';
import UserRepository from './repositories/user.repository';
import VehicleRepository from './repositories/vehicle.repository';
import SuplierRepository from './repositories/suplier.respository';
import ColaboratorRepository from './repositories/colaborator.repository';
import VisitorRepository from './repositories/visitor.repository';
@Module({
  exports: [UserRepository,VehicleRepository,SuplierRepository,ColaboratorRepository,VisitorRepository],
  providers: [PrismaService, UserRepository,VehicleRepository,SuplierRepository,ColaboratorRepository, VisitorRepository],
})
export class DatabaseModule {}

