import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { UpdateVisitorDto } from './dto/update-visitor.dto';
import VisitorRepository from 'src/database/repositories/visitor.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class VisitorService {
  constructor(private readonly visitor_repository: VisitorRepository) {}

  async create(createVisitorDto: CreateVisitorDto) {
    const data: Prisma.visitorCreateInput = {
      name: createVisitorDto.name,
      rg: createVisitorDto.rg,
      phone: createVisitorDto.phone,
    };

    const alreadExistRg = await this.visitor_repository.findOne({
      rg: createVisitorDto.rg,
    });

    if (alreadExistRg)
      throw new BadRequestException('Já existe registro para o RG informado');

    return await this.visitor_repository.create(data);
  }

  findAll() {
    return `This action returns all visitor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} visitor`;
  }

  update(id: number, updateVisitorDto: UpdateVisitorDto) {
    return `This action updates a #${id} visitor`;
  }

  remove(id: number) {
    return `This action removes a #${id} visitor`;
  }
}
