import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import CheckInOutCollaboratorRepository from '../../../src/database/repositories/check_in_out_collaborator.repository';
import { Prisma } from '@prisma/client';
import CheckInOutVisitorRepository from '../../../src/database/repositories/check_in_out_visitor.repository copy';
import CheckInOutSuplierRepository from '../../../src/database/repositories/check_in_out_suplier.repository';
import { UpdateCheckInOutDto } from './dto/update-check-in-out.dto';
import { TypeCheckCommon } from '../../../src/common/typeChecks.common';
import httpMessagesCommon from '../../../src/common/http-messages.common';
import * as dayjs from 'dayjs';
import { CreateCheckInOutDto } from './dto/create-check-in-out.dto';
import VisitorRepository from '../../../src/database/repositories/visitor.repository';
import { FindManyCheckDto } from './dto/find-many-check.dto';
import { Workbook } from 'exceljs';
import UserRepository from '../../../src/database/repositories/user.repository';

@Injectable()
export class CheckIntOutService {
  constructor(
    private readonly checkInOutCollaboratorRepository: CheckInOutCollaboratorRepository,
    private readonly checkInOutVisitorRepository: CheckInOutVisitorRepository,
    private readonly checkInOutSuplierRepository: CheckInOutSuplierRepository,
    private readonly visitorRepository: VisitorRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async findAll({ from, to }: FindManyCheckDto) {
    const startDay = from
      ? dayjs(from).subtract(3, 'h').startOf('d').toDate()
      : dayjs().subtract(3, 'h').startOf('d').toDate();
    const endDay = to
      ? dayjs(to).subtract(3, 'h').endOf('d').toDate()
      : dayjs().subtract(3, 'h').endOf('d').toDate();

    const whereCollaborator: Prisma.check_in_out_collaboratorWhereInput = {
      AND: [
        { date_check_in: { gte: startDay } },
        { date_check_in: { lte: endDay } },
      ],
    };

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

    const whereVisitor: Prisma.check_in_out_visitorWhereInput = {
      AND: [
        { date_check_in: { gte: startDay } },
        { date_check_in: { lte: endDay } },
      ],
    };
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

    const whereSuplier: Prisma.check_in_out_suplierWhereInput = {
      AND: [
        { date_check_in: { gte: startDay } },
        { date_check_in: { lte: endDay } },
      ],
    };

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
        name: element.name_employee,
        document: element.rg_empoyee,
      };
      return obj;
    });

    return [...visitorCheck, ...collaboratoresCheck, ...suplierCheck];
  }

  async registerCheckOut({ id, type }: UpdateCheckInOutDto) {
    if (type === TypeCheckCommon.visitor)
      return await this.registerCheckOutVisitor(id);

    if (type === TypeCheckCommon.suplier)
      return await this.registerCheckOutSuplier(id);

    if (type === TypeCheckCommon.collaborator)
      return await this.registerCheckOutCollaborator(id);
  }

  async registerCheckIn({
    collaborator_id,
    document,
    name,
    plate,
    suplier_id,
    type,
  }: CreateCheckInOutDto) {
    if (type === TypeCheckCommon.visitor)
      return await this.registerCheckInVisitors({
        name,
        document,
        plate,
      });

    if (type === TypeCheckCommon.suplier)
      return await this.registerCheckInSuplier({
        suplier_id,
        plate,
        name,
        document,
      });

    if (type === TypeCheckCommon.collaborator)
      return await this.registerCheckInCollaborator({ collaborator_id, plate });
  }

  async registerCheckInSuplier({ suplier_id, plate, name, document }: any) {
    return await this.checkInOutSuplierRepository.create({
      date_check_in: dayjs().subtract(3, 'h').toDate(),
      name_employee: name,
      rg_empoyee: document,
      plate,
      suplier: { connect: { id: suplier_id } },
    });
  }

  async registerCheckInCollaborator({ collaborator_id, plate }: any) {
    return await this.checkInOutCollaboratorRepository.create({
      date_check_in: dayjs().subtract(3, 'h').toDate(),
      plate,
      collaborator: { connect: { id: collaborator_id } },
    });
  }

  async registerCheckInVisitors({ name, document, plate }: any) {
    const visitor = await this.visitorRepository.findOne({
      name: { contains: name },
      rg: { contains: document },
    });

    if (!visitor) {
      throw new BadRequestException(
        'Visitante não cadastrado. Realize o cadastro do visitante e depois tente novamente',
      );
    }

    return await this.checkInOutVisitorRepository.create({
      date_check_in: dayjs().subtract(3, 'h').toDate(),
      plate,
      visitor: { connect: { id: visitor.id } },
    });
  }

  async registerCheckOutSuplier(id: number) {
    const suplier = await this.checkInOutSuplierRepository.findOne({
      id,
    });

    if (!suplier) throw new NotFoundException(httpMessagesCommon.notFound);

    if (suplier.date_check_out)
      throw new BadRequestException('Saída já registrada anteriormente');

    return await this.checkInOutSuplierRepository.update(id, {
      date_check_out: dayjs().toDate(),
    });
  }

  async registerCheckOutCollaborator(id: number) {
    const collaborator = await this.checkInOutCollaboratorRepository.findOne({
      id,
    });

    if (!collaborator) throw new NotFoundException(httpMessagesCommon.notFound);

    if (collaborator.date_check_out)
      throw new BadRequestException('Saída já registrada anteriormente');

    return await this.checkInOutCollaboratorRepository.update(id, {
      date_check_out: dayjs().subtract(3, 'h').toDate(),
    });
  }

  async registerCheckOutVisitor(id: number) {
    const visitor = await this.checkInOutVisitorRepository.findOne({
      id,
    });

    if (!visitor) throw new NotFoundException(httpMessagesCommon.notFound);

    if (visitor.date_check_out)
      throw new BadRequestException('Saída já registrada anteriormente');

    return await this.checkInOutVisitorRepository.update(id, {
      date_check_out: dayjs().subtract(3, 'h').toDate(),
    });
  }

  async exportToXLSX({ from, to }: FindManyCheckDto, userId: number) {
    const user = await this.userRepository.findOne({ id: userId });

    if (!user.privilege) {
      throw new ForbiddenException(
        'Acesso negado, você não possui permissão de acesso a essa funcionalidade',
      );
    }

    const result = await this.findAll({ from, to });

    const workbook = new Workbook();

    const worksheet = workbook.addWorksheet('histórico de entradas e saídas');

    worksheet.columns = [
      { header: 'Nome', key: 'name', width: 20 },
      { header: 'Documento', key: 'document', width: 20 },
      { header: 'Tipo', key: 'type', width: 20 },
      { header: 'Placa', key: 'plate', width: 20 },
      { header: 'Hora entrada', key: 'checkin', width: 20 },
      { header: 'Hora saída', key: 'checkout', width: 20 },
    ];

    result.forEach((register) => {
      const type = this.typeRegister(register);

      worksheet.addRow({
        name: register.name,
        document: register.document,
        type: type,
        plate: register.plate,
        checkin: register.date_check_in,
        checkout: register.date_check_out,
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();

    const file = {
      name: `historico-${dayjs(from).format('DD-MM-YYYY')}-${dayjs(to).format('DD-MM-YYYY')}.xlsx`,
      mimetype:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      buffer,
    };
    return file;
  }

  typeRegister(register) {
    let type = '';
    type = register.visitor_id ? 'Visitante' : type;
    type = register.collaborator_id ? 'Colaborador' : type;
    type = register.suplier_id ? 'Prestador serviço' : type;

    return type;
  }
}
