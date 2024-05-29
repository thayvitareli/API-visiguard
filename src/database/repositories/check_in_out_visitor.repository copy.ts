import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export default class CheckInOutVisitorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.check_in_out_visitorCreateInput) {
    return await this.prisma.check_in_out_visitor.create({ data });
  }

  async findMany(
    where: Prisma.check_in_out_visitorWhereInput,
    skip?: number,
    take?:number,
    select?: Prisma.visitorSelect,
  ) {
    return await this.prisma.check_in_out_visitor.findMany({
      where,
      skip,
      take,
      select,
    });
  }

  async update(id: number, data: Prisma.check_in_out_visitorUpdateInput) {
    return await this.prisma.check_in_out_visitor.update({
      where: { id: id },
      data,
    });
  }

  async count(where: Prisma.check_in_out_visitorWhereInput) {
    return await this.prisma.check_in_out_visitor.count({ where });
  }

  async findOne(where: Prisma.check_in_out_visitorWhereInput) {
    return await this.prisma.check_in_out_visitor.findFirst({ where });
  }
}
