import { IsNumber, IsOptional } from 'class-validator';
import FindManyDto from 'src/utils/find-many-dto';

export class FindManyVeicheDto extends FindManyDto {
  @IsOptional()
  @IsNumber()
  type: number;
}
