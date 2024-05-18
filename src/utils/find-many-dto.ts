import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export default class FindManyDto {
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber()
  skip: number;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber()
  take: number;

  @IsOptional()
  @IsString()
  search: string;
}
