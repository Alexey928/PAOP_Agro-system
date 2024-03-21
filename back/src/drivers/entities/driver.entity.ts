import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Task_machineEntity} from "../../tasks/entities/Task_machine.entity";


@Entity({name:"driver"})
export class Driver {
    @PrimaryGeneratedColumn()
    id:number
    @Column({nullable:false,type:"varchar"})
    name:string
    @Column({nullable:false,type:"varchar"})
    surname:string
    @Column({nullable:false,type:"varchar"})
    driver_license_number:string
    @OneToMany(()=>Task_machineEntity,(taskMachine)=>taskMachine.task)
    taskMachines:Task_machineEntity[]
}
