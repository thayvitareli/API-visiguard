import { IsNumber, IsOptional, IsString } from 'class-validator';

export default class FindManyDto {
  @IsOptional()
  @IsNumber()
  skip: number;

  @IsOptional()
  @IsNumber()
  take: number;

  @IsOptional()
  @IsString()
  search: string;
}
