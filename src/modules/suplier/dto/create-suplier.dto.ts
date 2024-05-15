import { IsString } from "class-validator";

export class CreateSuplierDto {
    @IsString()
    name: string;
    @IsString()
    RG: string;
    @IsString()
    phone: string;
}
