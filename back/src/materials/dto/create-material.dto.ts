import {IsNotEmpty} from "class-validator";

export class CreateMaterialDto {
@IsNotEmpty()
name:string;
    subType:string;
@IsNotEmpty()
type:string;
@IsNotEmpty()
cValue:string;
massOfThousen:number;
@IsNotEmpty()
consumptionRate:string;
basePrice:number;
@IsNotEmpty()
packaging:string
metaData:string;
}

