import { Injectable } from '@nestjs/common';
import { CreateSuplierDto } from './dto/create-suplier.dto';
import { UpdateSuplierDto } from './dto/update-suplier.dto';
import SuplierRepository from 'src/database/repositories/suplier.respository';
import { FindManySuplierDto } from './dto/find-many-suplier-dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class SuplierService {
  constructor(private readonly suplierRepository: SuplierRepository) {}
  create(createSuplierDto: CreateSuplierDto) {
    return 'This action adds a new suplier';
  }

  async findAll({ search, CNPJ, skip, take }: FindManySuplierDto) {
    let where: Prisma.suplierWhereInput = {};

    if (search) {
      where = {
        ...where,
        OR: [
          {
            name: { contains: search },
          },
          {
            CNPJ: { contains: CNPJ },
          },
        ],
      };
    }

    const records = await this.suplierRepository.findMany(where, skip, take);
    const total = await this.suplierRepository.count(where);
    return { total, records };
  }

  findOne(id: number) {
    return `This action returns a #${id} suplier`;
  }

  update(id: number, updateSuplierDto: UpdateSuplierDto) {
    return `This action updates a #${id} suplier`;
  }

  remove(id: number) {
    return `This action removes a #${id} suplier`;
  }
}
