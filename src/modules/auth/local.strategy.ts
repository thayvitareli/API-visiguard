import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import httpMessagesCommon from 'src/common/http-messages.common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'cpf',
    });
  }

  async validate(cpf: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({ cpf, password });

    if (!user) {
      throw new UnauthorizedException(httpMessagesCommon.permissionDenied);
    }
    return user;
  }
}
