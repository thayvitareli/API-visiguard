import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateColaboratorDto } from './dto/create-colaborator.dto';
import { FindManyCollaboratorDto } from './dto/find-many-collaborator.dto';
import { Prisma } from '@prisma/client';
import CollaboratorRepository from '../../../src/database/repositories/collaborator.repository';
import UserRepository from '../../../src/database/repositories/user.repository';
import { Collaborator } from './entities/collaborator.entity';

@Injectable()
export class CollaboratorService {
  constructor(
    private readonly collaboratorRepository: CollaboratorRepository,
    private readonly userRepository: UserRepository,
  ) {}
  async create(createColaboratorDto: CreateColaboratorDto, userId: number) {
    const data: Prisma.collaboratorCreateInput = {
      name: createColaboratorDto.name,
      department: createColaboratorDto.departament,
      position: createColaboratorDto.position,
      register_employ: createColaboratorDto.register_employee,
    };

    const user = await this.userRepository.findOne({ id: userId });

    if (!user) {
      throw new UnauthorizedException(
        'Necessário fornecer autenticação para essa solicitação',
      );
    }

    if (!user.privilege) {
      throw new ForbiddenException(
        'Acesso negado, você não possui permissão de acesso a essa funcionalidade',
      );
    }

    const alreadExistRegisterEmploy = await this.collaboratorRepository.findOne(
      { register_employ: createColaboratorDto.register_employee },
    );

    if (alreadExistRegisterEmploy)
      throw new BadRequestException('Registro de colaborador já cadastrado');

    return await this.collaboratorRepository.create(data);
  }

  async findAll({ search, skip, take }: FindManyCollaboratorDto) {
    let where: Prisma.collaboratorWhereInput = {};

    if (search) {
      where = {
        ...where,
        OR: [
          { name: { contains: search } },
          { register_employ: { contains: search } },
        ],
      };
    }

    const select: Prisma.collaboratorSelect = {
      id: true,
      name: true,
      register_employ: true,
      department: true,
      position: true,
      created_at: true,
      updated_at: true,
    };

    const records: Collaborator[] = await this.collaboratorRepository.findMany(
      where,
      skip,
      take,
      select,
    );
    const total = await this.collaboratorRepository.count(where);

    return { total, records };
  }
}
