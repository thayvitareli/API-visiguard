import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import VehicleRepository from 'src/database/repositories/vehicle.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class VehicleService {
  constructor(private readonly vehicle_repository:VehicleRepository){}
  create(createVehicleDto: CreateVehicleDto) {
    const data: Prisma.vehicleCreateInput = {
      brand: createVehicleDto.brand.toString(),
      model: createVehicleDto.model.toString(),
      plate: createVehicleDto.plate.toString(),
      type: createVehicleDto.type
    }
    return this.vehicle_repository.create(data);
  }

  findAll() {
    return `This action returns all vehicle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vehicle`;
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto) {
    return `This action updates a #${id} vehicle`;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }
}
