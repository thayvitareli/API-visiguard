import { Injectable } from '@nestjs/common';
import { CreateCheckIntOutDto } from './dto/create-check-int-out.dto';
import { UpdateCheckIntOutDto } from './dto/update-check-int-out.dto';
import CheckInOutCollaboratorRepository from 'src/database/repositories/check_in_out_collaborator.repository';
import { Prisma } from '@prisma/client';
import CheckInOutVisitorRepository from 'src/database/repositories/check_in_out_visitor.repository copy';
import CheckInOutSuplierRepository from 'src/database/repositories/check_in_out_suplier.repository';

@Injectable()
export class CheckIntOutService {
  constructor(
    private readonly checkInOutCollaboratorRepository: CheckInOutCollaboratorRepository,
    private readonly checkInOutVisitorRepository: CheckInOutVisitorRepository,
    private readonly checkInOutSuplierRepository: CheckInOutSuplierRepository,
  ) {}

  create(createCheckIntOutDto: CreateCheckIntOutDto) {
    return 'This action adds a new checkIntOut';
  }

  async findAll() {
    const whereCollaborator: Prisma.check_in_out_collaboratorWhereInput = {};
    const collaboratoresCheck = (
      await this.checkInOutCollaboratorRepository.findMany({
        where: whereCollaborator,
        include: {
          collaborator: true,
        },
      })
    ).map((element) => {
      const obj = {
        id: element.id,
        date_check_in: element.date_check_in,
        date_check_out: element.date_check_out,
        plate: element.plate,
        collaborator_id: element.collaborator_id,
        name: element.collaborator.name,
        document: element.collaborator.register_employ,
      };
      return obj;
    });

    const whereVisitor: Prisma.check_in_out_visitorWhereInput = {};
    const visitorCheck = (
      await this.checkInOutVisitorRepository.findMany({
        where: whereVisitor,
        include: {
          visitor: true,
        },
      })
    ).map((element) => {
      const obj = {
        id: element.id,
        date_check_in: element.date_check_in,
        date_check_out: element.date_check_out,
        plate: element.plate,
        visitor_id: element.visitor_id,
        name: element.visitor.name,
        document: element.visitor.rg,
      };
      return obj;
    });

    const whereSuplier: Prisma.check_in_out_suplierWhereInput = {};
    const suplierCheck = (
      await this.checkInOutSuplierRepository.findMany({
        where: whereSuplier,
        include: {
          suplier: true,
        },
      })
    ).map((element) => {
      const obj = {
        id: element.id,
        date_check_in: element.date_check_in,
        date_check_out: element.date_check_out,
        plate: element.plate,
        suplier_id: element.suplier_id,
        name: element.suplier.name,
        document: element.suplier.CNPJ,
      };
      return obj;
    });

    return [...visitorCheck, ...collaboratoresCheck, ...suplierCheck];
  }

  update(id: number, updateCheckIntOutDto: UpdateCheckIntOutDto) {
    return `This action updates a #${id} checkIntOut`;
  }
}
