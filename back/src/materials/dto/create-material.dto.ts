import {IsNotEmpty} from "class-validator";

export class CreateMaterialDto {
@IsNotEmpty()
name:string;
type:string;
description:string;
@IsNotEmpty()
materialPrice:number;
metadata:string;
}
