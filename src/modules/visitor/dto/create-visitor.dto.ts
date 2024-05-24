import { Mask } from '@tboerc/maskfy';
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateVisitorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  rg: string;

  @Transform(({ value }) => Mask.phone.raw(value))
  @IsNotEmpty()
  @IsString()
  phone: string;
}
