import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Task_machineEntity} from "../../tasks/entities/Task_machine.entity";

@Entity()
export class Machine {
    @PrimaryGeneratedColumn()
    id:number
    @Column({type:"varchar"})
    name:string
    @Column({type:"varchar"})
    carNumber:string
    @OneToMany(()=>Task_machineEntity,(task_machineEntity)=>task_machineEntity.machine)
    taskMachines:Task_machineEntity[]
}
