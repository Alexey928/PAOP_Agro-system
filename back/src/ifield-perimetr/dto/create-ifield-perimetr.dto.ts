import {IsNotEmpty} from "class-validator";

export class CreateIfieldPerimetrDto {
    @IsNotEmpty()
    fieldId:number
    sqere:number;
    @IsNotEmpty()
    trajectory:string;
}
