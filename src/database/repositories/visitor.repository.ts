import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export default class VisitorRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: Prisma.visitorCreateInput) {
    return await this.prisma.visitor.create({ data });
  }

  async findOne(where: Prisma.visitorWhereInput) {
    return await this.prisma.visitor.findFirst({ where });
  }
}
