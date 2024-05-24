import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { UpdateVisitorDto } from './dto/update-visitor.dto';
import VisitorRepository from 'src/database/repositories/visitor.repository';
import { Prisma } from '@prisma/client';
import { FindManyVisitorDto } from './dto/find-many-visitor-dto';

@Injectable()
export class VisitorService {
  constructor(private readonly visitorRepository: VisitorRepository) {}

  async create(createVisitorDto: CreateVisitorDto) {
    const data: Prisma.visitorCreateInput = {
      name: createVisitorDto.name,
      rg: createVisitorDto.rg,
      phone: createVisitorDto.phone,
    };

    const alreadExistRg = await this.visitorRepository.findOne({
      rg: createVisitorDto.rg,
    });

    if (alreadExistRg)
      throw new BadRequestException('Já existe registro para o RG informado');

    return await this.visitorRepository.create(data);
  }

  async findAll({ rg, search, skip, take }: FindManyVisitorDto) {
    let where: Prisma.visitorWhereInput = {};

    if (search) {
      where = {
        ...where,
        OR: [
          {
            name: { contains: search },
          },
          {
            rg: { contains: rg },
          },
        ],
      };
    }

    const records = await this.visitorRepository.findMany(where, skip, take);
    const total = await this.visitorRepository.count(where);
    return { total, records };
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
