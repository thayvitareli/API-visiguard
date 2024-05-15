import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateVehicleDto {
    @IsString()
    @IsNotEmpty()
    plate: String;
    @IsNumber()
    @IsNotEmpty()
    type:number;
    @IsString()
    @IsNotEmpty()
    brand:String;
    @IsString()
    @IsNotEmpty()
    model:String;
}
