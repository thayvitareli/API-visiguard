import { Injectable } from '@nestjs/common';
import { CreateCheckIntOutDto } from './dto/create-check-int-out.dto';
import { UpdateCheckIntOutDto } from './dto/update-check-int-out.dto';
import CheckInOutCollaboratorRepository from 'src/database/repositories/check_in_out_collaborator.repository';
import { Prisma } from '@prisma/client';
import CheckInOutVisitorRepository from 'src/database/repositories/check_in_out_visitor.repository copy';
import CheckInOutSuplierRepository from 'src/database/repositories/check_in_out_suplier.repository';

@Injectable()
export class CheckIntOutService {
  constructor(private readonly checkInOutCollaboratorRepository:CheckInOutCollaboratorRepository,
    private readonly checkInOutVisitorRepository:CheckInOutVisitorRepository,
    private readonly checkInOutSuplierRepository: CheckInOutSuplierRepository){}

  create(createCheckIntOutDto: CreateCheckIntOutDto) {
    return 'This action adds a new checkIntOut';
  }

  async findAll() {
    let whereCollaborator: Prisma.check_in_out_collaboratorWhereInput = {}
    const collaboratoresCheck = await this.checkInOutCollaboratorRepository.findMany(whereCollaborator);

    let whereVisitor: Prisma.check_in_out_visitorWhereInput = {}
    const visitorCheck = await this.checkInOutVisitorRepository.findMany(whereVisitor);

    let whereSuplier: Prisma.check_in_out_suplierWhereInput = {}
    const suplierCheck = await this.checkInOutSuplierRepository.findMany(whereSuplier);

    return [...visitorCheck, ...collaboratoresCheck,...suplierCheck];
  }

  findOne(id: number) {
    return `This action returns a #${id} checkIntOut`;
  }

  update(id: number, updateCheckIntOutDto: UpdateCheckIntOutDto) {
    return `This action updates a #${id} checkIntOut`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkIntOut`;
  }
}
