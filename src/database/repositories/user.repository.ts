import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export default class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.userCreateInput) {
    return await this.prisma.user.create({ data });
  }

  async findMany({ where }: { where?: Prisma.userWhereInput }) {
    return await this.prisma.user.findMany({
      where,
      select: {
        id: true,
        CPF: true,
        name: true,
        privilege: true,
        created_at: true,
      },
    });
  }

  async findOne(where: Prisma.userWhereInput, select?: Prisma.userSelect) {
    return await this.prisma.user.findFirst({ where, select });
  }

  async update(id: number, data: Prisma.userUpdateInput) {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
