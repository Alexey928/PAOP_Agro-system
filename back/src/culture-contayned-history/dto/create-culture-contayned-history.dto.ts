import {IsNotEmpty} from "class-validator";

export class CreateCultureContaynedHistoryDto {
    @IsNotEmpty()
    culture:string
    @IsNotEmpty()
    sqere:number
    @IsNotEmpty()
    from:Date
    @IsNotEmpty()
    cultureYearCount:string
}
