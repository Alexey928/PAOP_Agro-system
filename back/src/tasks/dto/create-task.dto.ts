import {IsNotEmpty} from "class-validator";
export type maeterialPrice = {
    id:number
    planedAmount:number
}
export type machineData = {
    machineId:number
    planedFuelAmount:number
    driverID:number

}

export class CreateTaskDto {
    @IsNotEmpty()
    from:Date;
    @IsNotEmpty()
    status:string;
    @IsNotEmpty()
    type:string;
    coment:string;
    @IsNotEmpty()
    fieldId:string
    materialIdes:maeterialPrice[]
    machines:machineData[]
}

export class bindMaterialToTaskDTO{
    @IsNotEmpty()
    taskId:number
    @IsNotEmpty()
    materialsPrices:maeterialPrice[]
}
export class bindMachinesTotaskDTO{
    @IsNotEmpty()
    taskId:number
    @IsNotEmpty()
    machinesData:machineData[]
}


