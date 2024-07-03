import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateSuplierDto } from './dto/create-suplier.dto';
import { UpdateSuplierDto } from './dto/update-suplier.dto';
import SuplierRepository from 'src/database/repositories/suplier.respository';
import { FindManySuplierDto } from './dto/find-many-suplier-dto';
import { Prisma } from '@prisma/client';
import UserRepository from 'src/database/repositories/user.repository';

@Injectable()
export class SuplierService {
  constructor(private readonly suplierRepository: SuplierRepository,
    private readonly userRepository: UserRepository
  ) {}
  async create({ CNPJ, name, phone }: CreateSuplierDto, userId: number) {

    
    const user = await this.userRepository.findOne({ id: userId });

    if(!user){
      throw new UnauthorizedException('Necessário fornecer autenticação para essa solicitação');
    }
  
    if(!user.privilege){
      throw new ForbiddenException('Acesso negado, você não possui permissão de acesso a essa funcionalidade');
    }

    const isCNPJalreadyExist = await this.suplierRepository.findOne({
      CNPJ,
    });

    if (isCNPJalreadyExist)
      throw new BadRequestException('Empresa já cadastrada');

    const data: Prisma.suplierCreateInput = {
      CNPJ,
      name,
      phone,
      status: true,
    };

    return await this.suplierRepository.create(data);
  }

  async findAll({ search, CNPJ, skip, take }: FindManySuplierDto) {
    let where: Prisma.suplierWhereInput = {};

    if (search) {
      where = {
        ...where,
        OR: [
          {
            name: { contains: search },
          },
          {
            CNPJ: { contains: CNPJ },
          },
        ],
      };
    }

    const records = await this.suplierRepository.findMany(where, skip, take);
    const total = await this.suplierRepository.count(where);
    return { total, records };
  }

  findOne(id: number) {
    return `This action returns a #${id} suplier`;
  }

  update(id: number, updateSuplierDto: UpdateSuplierDto) {
    return `This action updates a #${id} suplier`;
  }

  remove(id: number) {
    return `This action removes a #${id} suplier`;
  }
}
