import { IsString } from 'class-validator';

export class CreateSuplierDto {
  @IsString()
  name: string;
  @IsString()
  phone: string;
  @IsString()
  CNPJ: string;
}
