import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export default class CheckInOutCollaboratorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.check_in_out_collaboratorCreateInput) {
    return await this.prisma.check_in_out_collaborator.create({ data });
  }

  async findMany({
    where,
    skip,
    take,
    include,
  }: {
    where: Prisma.check_in_out_collaboratorWhereInput;
    skip?: number;
    take?: number;
    include?: Prisma.check_in_out_collaboratorInclude;
  }) {
    return await this.prisma.check_in_out_collaborator.findMany({
      where,
      skip,
      take,
      include,
    });
  }

  async update(id: number, data: Prisma.check_in_out_collaboratorUpdateInput) {
    return await this.prisma.check_in_out_collaborator.update({
      where: { id: id },
      data,
    });
  }

  async count(where: Prisma.check_in_out_collaboratorWhereInput) {
    return await this.prisma.check_in_out_collaborator.count({ where });
  }

  async findOne(where: Prisma.check_in_out_collaboratorWhereInput) {
    return await this.prisma.check_in_out_collaborator.findFirst({ where });
  }
}
