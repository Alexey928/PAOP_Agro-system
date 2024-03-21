import {IsNotEmpty} from "class-validator";

export class CreateDriverDto {
    @IsNotEmpty()
    name:string
    @IsNotEmpty()
    surname:string
    @IsNotEmpty()
    type:string
}
