import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Machine} from "../../machine/entities/machine.entity";
import {Task} from "./task.entity";
import {Driver} from "../../drivers/entities/driver.entity";



@Entity()
export class Task_machineEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({nullable:true})
    plannedFuelAmount:number;
    @Column({nullable:true})
    actualFuelAmount:number;
    @Column({nullable:true})
    fuelType:string
    @ManyToOne(()=>Machine,(machine)=>machine.taskMachines)
    @JoinColumn({name:"machineId"})
    machine:Machine
    @ManyToOne(()=>Task,(task)=>task.taskMachines)
    @JoinColumn({name:"taskId"})
    task:Task
    @ManyToOne(()=>Driver,(driver)=>driver.taskMachines)
    @JoinColumn({name:"driverId"})
    driver:Driver

}
