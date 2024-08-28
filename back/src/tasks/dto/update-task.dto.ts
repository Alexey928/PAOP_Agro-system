import { PartialType } from '@nestjs/swagger';
import {CreateTaskDto, machineData} from './create-task.dto';
import {IsNotEmpty} from "class-validator";


export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @IsNotEmpty()
    to:Date
    @IsNotEmpty()
    machineData:machineData[];
    @IsNotEmpty()
    status:string
    @IsNotEmpty()
    square:number
}

export class CloseTaskDto extends PartialType(CreateTaskDto){
    @IsNotEmpty()
    status:string
    @IsNotEmpty()
    fieldId:string
}
