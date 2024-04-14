import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export default class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(where: Prisma.userWhereInput, select?: Prisma.userSelect) {
    return await this.prisma.user.findFirst({ where, select });
  }
}
