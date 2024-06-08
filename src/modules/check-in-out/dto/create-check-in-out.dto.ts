import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCheckInOutDto {
  @IsOptional()
  @IsString()
  plate: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  document: string;

  @IsNumber()
  @IsIn([1, 2, 3])
  type: number;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber()
  visitor_id: number;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber()
  collaborator_id: number;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber()
  suplier_id: number;
}
