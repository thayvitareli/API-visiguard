import { Mask } from '@tboerc/maskfy';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import FindManyDto from 'src/utils/find-many-dto';

export class FindManySuplierDto extends FindManyDto {
  @IsString()
  @IsOptional()
  @Transform(({ value }) => Mask.cnpj.raw(value))
  CNPJ: string;
}
