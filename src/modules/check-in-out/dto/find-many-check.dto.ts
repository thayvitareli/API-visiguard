import { Transform } from 'class-transformer';
import {  IsOptional, IsDate } from 'class-validator';
import * as dayjs from 'dayjs';

export class FindManyCheckDto {
  @IsOptional()
  @Transform(({value}) => dayjs(value).toDate())
  @IsDate()
  from?: Date;

  @IsOptional()
  @Transform(({value}) => dayjs(value).toDate())
  @IsDate()
  to?: Date;

 
}
