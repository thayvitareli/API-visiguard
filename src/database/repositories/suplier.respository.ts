import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export default class SuplierRepository {
  constructor(private readonly prisma: PrismaService) {

  }

  async create (data:Prisma.suplierCreateInput){
    return await this.prisma.suplier.create({data});
  }
}
