import { IsOptional, IsString } from 'class-validator';
import FindManyDto from 'src/utils/find-many-dto';

export class FindManySuplierDto extends FindManyDto {
  @IsString()
  @IsOptional()
  CNPJ: string;
}
