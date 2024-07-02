import { Mask } from "@tboerc/maskfy";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateUserDto {
    @Transform(({value}) => Mask.cpf.raw(value))
    @IsString()
    @IsNotEmpty()
    CPF:string;

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    password:string;

    @IsNumber()
    @IsNotEmpty()
    privilege: number;

}
