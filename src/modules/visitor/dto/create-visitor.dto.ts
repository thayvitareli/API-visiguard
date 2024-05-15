import { IsEmpty, IsString } from "class-validator";


export class CreateVisitorDto {
    
    @IsEmpty()
    @IsString()
    name:string;
    
    @IsEmpty()
    @IsString()
    rg:string;
    
    @IsEmpty()
    @IsString()
    phone:string;



}
