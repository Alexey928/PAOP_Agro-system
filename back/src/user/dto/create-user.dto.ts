import {IsEmail, IsNotEmpty, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example:"Bob Marly"})
    @IsNotEmpty()
    name:string|null;
    @ApiProperty({example:"MiSteRyBOB@ukr.net"})
    @IsEmail()
    email:string;
    @ApiProperty({example:"My_random_password"})
    @MinLength(2,{message:"Mast bee more of  symbols "})
    password:string;
    @ApiProperty({example:"GENERAL_AGRONOMIST"})
    @IsNotEmpty()
    role:string
}
