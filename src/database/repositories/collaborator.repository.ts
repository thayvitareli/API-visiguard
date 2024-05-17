import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export default class CollaboratorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.collaboratorCreateInput) {
    return await this.prisma.collaborator.create({ data });
  }

  async findMany(
    where: Prisma.collaboratorWhereInput,
    skip: number,
    take: number,
    select?: Prisma.collaboratorSelect,
  ) {
    return await this.prisma.collaborator.findMany({
      where,
      skip,
      take,
      select,
    });
  }

  async count(where: Prisma.collaboratorWhereInput) {
    return await this.prisma.collaborator.count({ where });
  }

  async findOne(where: Prisma.collaboratorWhereInput) {
    return await this.prisma.collaborator.findFirst({ where });
  }
}
