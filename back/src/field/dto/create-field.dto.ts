import {ApiProperty} from "@nestjs/swagger";

export class CreateFieldDto {
    @ApiProperty({example:"Some field name", description:"its can be empty"})
    name:string;

    @ApiProperty({example:"Some field description", description:"its can be empty"})
    description:string;

    @ApiProperty({example:"#fffff", description:"its can be empty"})
    color:string
}

