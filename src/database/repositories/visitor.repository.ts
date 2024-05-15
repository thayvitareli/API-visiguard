import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export default class VisitorRepository {
    constructor(private readonly prisma: PrismaService){

    }
async create (data:Prisma.VisitorCreateInput){
    return await this.prisma.suplier.create({data})
}

}