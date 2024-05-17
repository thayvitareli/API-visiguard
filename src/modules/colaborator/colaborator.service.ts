import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateColaboratorDto } from './dto/create-colaborator.dto';
import { UpdateColaboratorDto } from './dto/update-colaborator.dto';
import { FindManyCollaboratorDto } from './dto/find-many-collaborator.dto';
import { Prisma } from '@prisma/client';
import CollaboratorRepository from 'src/database/repositories/collaborator.repository';
import UserRepository from 'src/database/repositories/user.repository';

@Injectable()
export class ColaboratorService {
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

    const alreadExistRegisterEmploy = await this.collaboratorRepository.findOne(
      { register_employ: createColaboratorDto.register_employee },
    );

    if (alreadExistRegisterEmploy)
      throw new BadRequestException('Registro de colaborador já cadastrado');

    if (!user.privilege)
      throw new BadRequestException(
        'Acesso Negado. Você não possui acesso a essa função',
      );

    return await this.collaboratorRepository.create(data);
  }

  async findAll({ search, skip, take }: FindManyCollaboratorDto) {
    const where: Prisma.collaboratorWhereInput = {
      OR: [
        { name: { contains: search } },
        { register_employ: { contains: search } },
      ],
    };

    const record = await this.collaboratorRepository.findMany(
      where,
      skip,
      take,
    );
    const total = await this.collaboratorRepository.count(where);

    return { total, record };
  }

  findOne(id: number) {
    return `This action returns a #${id} colaborator`;
  }

  update(id: number, updateColaboratorDto: UpdateColaboratorDto) {
    return `This action updates a #${id} colaborator`;
  }

  remove(id: number) {
    return `This action removes a #${id} colaborator`;
  }
}
