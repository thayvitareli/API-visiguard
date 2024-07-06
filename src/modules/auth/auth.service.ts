import { BadRequestException, Injectable } from '@nestjs/common';
import UserRepository from 'src/database/repositories/user.repository';
import { LoginDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import httpMessagesCommon from 'src/common/http-messages.common';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser({ cpf, password }: LoginDto) {
    const user = await this.userRepository.findOne({ CPF: cpf, status: true });
    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (isValidPassword) return user;

      throw new BadRequestException(httpMessagesCommon.loginFailed);
    }

    throw new BadRequestException(httpMessagesCommon.loginFailed);
  }

  async login({ cpf, password }: LoginDto) {
    const user = await this.validateUser({ cpf, password });

    return {
      name: user.name,
      pv: user.privilege,
      access_token: this.jwtService.sign({ userId: user.id }),
    };
  }
}
