import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import FindManyDto from 'src/utils/find-many-dto';

export class FindManyVeicheDto extends FindManyDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  type: number;
}
