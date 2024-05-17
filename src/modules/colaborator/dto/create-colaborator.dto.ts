import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateColaboratorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  register_employee: string;

  @IsNumber()
  position: number;

  @IsNumber()
  departament: number;
}
