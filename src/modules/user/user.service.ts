import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import UserRepository from 'src/database/repositories/user.repository';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository){}
 
 async create({ CPF,name,password,privilege}: CreateUserDto, userId:number) {
  const user = await this.userRepository.findOne({ id: userId})

  if(!user){
    throw new UnauthorizedException('Necessário fornecer autenticação para essa solicitação');
  }

  if(!user.privilege){
    throw new ForbiddenException('Acesso negado, você não possui permissão de acesso a essa funcionalidade');
  }

    password = await bcrypt.hash(password, Number(process.env.SALT))

    const data:Prisma.userCreateInput ={
      CPF,
      name,
      password,
      privilege: privilege,
    }

  
    return await this.userRepository.create(data)
  }

 async findAll(userId: number) {
    const user = await this.userRepository.findOne({ id: userId})

    if(!user){
      throw new UnauthorizedException('Necessário fornecer autenticação para essa solicitação');
    }
  
    if(!user.privilege){
      throw new ForbiddenException('Acesso negado, você não possui permissão de acesso a essa funcionalidade');
    }

    const users = await this.userRepository.findMany({})

    return { records: users}
   };
  }


