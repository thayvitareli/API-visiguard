import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import UserRepository from '../../database/repositories/user.repository';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(
    { CPF, name, password, privilege }: CreateUserDto,
    userId: number,
  ) {
    const user = await this.userRepository.findOne({ id: userId });

    if (!user) {
      throw new UnauthorizedException(
        'Necessário fornecer autenticação para essa solicitação',
      );
    }

    if (!user.privilege) {
      throw new ForbiddenException(
        'Acesso negado, você não possui permissão de acesso a essa funcionalidade',
      );
    }

    password = await bcrypt.hash(password, Number(process.env.SALT));

    const data: Prisma.userCreateInput = {
      CPF,
      name,
      password,
      privilege: privilege,
    };

    return await this.userRepository.create(data);
  }

  async findAll(userId: number) {
    const user = await this.userRepository.findOne({ id: userId });

    if (!user) {
      throw new UnauthorizedException(
        'Necessário fornecer autenticação para essa solicitação',
      );
    }

    if (!user.privilege) {
      throw new ForbiddenException(
        'Acesso negado, você não possui permissão de acesso a essa funcionalidade',
      );
    }

    const users = await this.userRepository.findMany({
      where: {
        status: true,
      },
    });

    return { records: users };
  }

  async update(requestUserId: number, updateUserDto: UpdateUserDto) {
    const isRequestUserAdmin = await this.userRepository.findOne({
      id: requestUserId,
      privilege: 1,
    });

    if (!isRequestUserAdmin) {
      throw new ForbiddenException(
        'Acesso negado, você não possui permissão de acesso a essa funcionalidade',
      );
    }

    let data: Prisma.userUpdateInput = {};

    if (updateUserDto.name) {
      data = { ...data, name: updateUserDto.name };
    }

    if (updateUserDto.password) {
      const password = await bcrypt.hash(
        updateUserDto.password,
        Number(process.env.SALT),
      );
      data = { ...data, password: password };
    }

    if (updateUserDto.privilege) {
      data = { ...data, privilege: updateUserDto.privilege };
    }

    await this.userRepository.update(updateUserDto.id, data);

    return { message: 'Operação realizada com sucesso' };
  }

  async remove(id: number, requestUserId: number) {
    const isRequestUserAdmin = await this.userRepository.findOne({
      id: requestUserId,
      privilege: 1,
    });

    if (!isRequestUserAdmin) {
      throw new ForbiddenException(
        'Acesso negado, você não possui permissão de acesso a essa funcionalidade',
      );
    }

    const userUpdate = await this.userRepository.findOne({ id });

    if (!userUpdate) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    await this.userRepository.update(id, {
      status: false,
    });

    return { message: 'Operação realizada com sucesso' };
  }
}
