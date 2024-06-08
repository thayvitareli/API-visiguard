import { IsIn, IsNumber } from 'class-validator';

export class UpdateCheckInOutDto {
  @IsNumber()
  id: number;

  @IsNumber()
  @IsIn([1, 2, 3])
  type: number;
}
