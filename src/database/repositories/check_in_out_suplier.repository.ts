import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export default class CheckInOutSuplierRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.check_in_out_suplierCreateInput) {
    return await this.prisma.check_in_out_suplier.create({ data });
  }

  async findMany(
    where: Prisma.check_in_out_suplierWhereInput,
    skip: number,
    take: number,
    select?: Prisma.suplierSelect,
  ) {
    return await this.prisma.check_in_out_suplier.findMany({
      where,
      skip,
      take,
      select,
    });
  }

  async update(id: number, data: Prisma.check_in_out_suplierUpdateInput) {
    return await this.prisma.check_in_out_suplier.update({
      where: { id: id },
      data,
    });
  }

  async count(where: Prisma.check_in_out_suplierWhereInput) {
    return await this.prisma.check_in_out_suplier.count({ where });
  }

  async findOne(where: Prisma.check_in_out_suplierWhereInput) {
    return await this.prisma.check_in_out_suplier.findFirst({ where });
  }
}
