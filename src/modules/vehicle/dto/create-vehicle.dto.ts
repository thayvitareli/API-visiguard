import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  plate: String;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  type: number;

  @IsString()
  @IsNotEmpty()
  brand: String;

  @IsString()
  @IsNotEmpty()
  model: String;
}
