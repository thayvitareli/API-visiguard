import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export default class ColaboratorRepository{
    constructor(private readonly prisma:PrismaService){

    }

    async create(data:Prisma.collaboratorCreateInput){
        return await this.prisma.collaborator.create({data});
    }
}