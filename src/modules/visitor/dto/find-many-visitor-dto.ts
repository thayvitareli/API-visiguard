import { IsOptional, IsString } from 'class-validator';
import FindManyDto from '../../../../src/utils/find-many-dto';

export class FindManyVisitorDto extends FindManyDto {
  @IsString()
  @IsOptional()
  rg: string;
}
