import { Mask } from '@tboerc/maskfy';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => Mask.cpf.raw(value))
  cpf: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
