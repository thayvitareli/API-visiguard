import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";


@Injectable()
export default class VehicleRepository{
    constructor(private readonly prisma:PrismaService){}

    async create(data:Prisma.vehicleCreateInput){
        return await this.prisma.vehicle.create({data})
    }
}