import {IsNotEmpty} from "class-validator";

export type materialUsageDataType = {
    materialId:number
    planedAmount:number
    Package:number
    currentConsumptionRate:number
    
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
    materialIdes:materialUsageDataType[]
    machines:machineData[]
}

export class bindMaterialToTaskDTO{
    @IsNotEmpty()
    taskId:number
    @IsNotEmpty()
    materialsPrices:materialUsageDataType[]
}
export class bindMachinesTotaskDTO{
    @IsNotEmpty()
    taskId:number
    @IsNotEmpty()
    machinesData:machineData[]
}


