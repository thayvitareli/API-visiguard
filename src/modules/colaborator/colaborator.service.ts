import { Injectable } from '@nestjs/common';
import { CreateColaboratorDto } from './dto/create-colaborator.dto';
import { UpdateColaboratorDto } from './dto/update-colaborator.dto';
import { FindManyCollaboratorDto } from './dto/find-many-collaborator.dto';
import { Prisma } from '@prisma/client';
import CollaboratorRepository from 'src/database/repositories/collaborator.repository';

@Injectable()
export class ColaboratorService {
  constructor(
    private readonly collaboratorRepository: CollaboratorRepository,
  ) {}
  create(createColaboratorDto: CreateColaboratorDto) {
    return 'This action adds a new colaborator';
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
