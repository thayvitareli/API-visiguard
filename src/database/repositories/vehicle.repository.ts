import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export default class VehicleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.vehicleCreateInput) {
    return await this.prisma.vehicle.create({ data });
  }

  async findMany(
    where: Prisma.vehicleWhereInput,
    skip: number,
    take: number,
    select?: Prisma.vehicleSelect,
  ) {
    return await this.prisma.vehicle.findMany({
      where,
      skip,
      take,
      select,
    });
  }

  async count(where: Prisma.vehicleWhereInput) {
    return await this.prisma.vehicle.count({ where });
  }
}
