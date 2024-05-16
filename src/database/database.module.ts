import { PrismaService } from './prisma/prisma.service';
import { Module } from '@nestjs/common';
import UserRepository from './repositories/user.repository';
import VehicleRepository from './repositories/vehicle.repository';
import SuplierRepository from './repositories/suplier.respository';
import VisitorRepository from './repositories/visitor.repository';
import CollaboratorRepository from './repositories/collaborator.repository';
@Module({
  exports: [
    UserRepository,
    VehicleRepository,
    SuplierRepository,
    CollaboratorRepository,
    VisitorRepository,
  ],
  providers: [
    PrismaService,
    UserRepository,
    VehicleRepository,
    SuplierRepository,
    CollaboratorRepository,
    VisitorRepository,
  ],
})
export class DatabaseModule {}
