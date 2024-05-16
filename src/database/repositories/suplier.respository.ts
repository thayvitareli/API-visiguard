import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export default class SuplierRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.suplierCreateInput) {
    return await this.prisma.suplier.create({ data });
  }

  async findMany(
    where: Prisma.suplierWhereInput,
    skip: number,
    take: number,
    select?: Prisma.suplierSelect,
  ) {
    return await this.prisma.suplier.findMany({
      where,
      select,
      skip,
      take,
    });
  }

  async count(where: Prisma.suplierWhereInput) {
    return await this.prisma.suplier.count({ where });
  }
}
