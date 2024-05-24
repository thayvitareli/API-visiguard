import { PrismaService } from './prisma/prisma.service';
import { Module } from '@nestjs/common';
import UserRepository from './repositories/user.repository';
import VehicleRepository from './repositories/vehicle.repository';
import SuplierRepository from './repositories/suplier.respository';
import VisitorRepository from './repositories/visitor.repository';
import CollaboratorRepository from './repositories/collaborator.repository';
import CheckInOutSuplierRepository from './repositories/check_in_out_suplier.repository';
import CheckInOutCollaboratorRepository from './repositories/check_in_out_collaborator.repository';
import CheckInOutVisitorRepository from './repositories/check_in_out_visitor.repository copy';
@Module({
  exports: [
    UserRepository,
    VehicleRepository,
    SuplierRepository,
    CollaboratorRepository,
    VisitorRepository,
    CheckInOutSuplierRepository,
    CheckInOutCollaboratorRepository,
    CheckInOutVisitorRepository,
  ],
  providers: [
    PrismaService,
    UserRepository,
    VehicleRepository,
    SuplierRepository,
    CollaboratorRepository,
    VisitorRepository,
    CheckInOutSuplierRepository,
    CheckInOutCollaboratorRepository,
    CheckInOutVisitorRepository,
  ],
})
export class DatabaseModule {}
