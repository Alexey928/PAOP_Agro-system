import {ApiProperty} from "@nestjs/swagger";

export class CreateAuthDto {
    @ApiProperty({example:"MiSteRyBOB@ukr.net"})
    email:string
    @ApiProperty({example:"My_random_password"})
    password:string
}
