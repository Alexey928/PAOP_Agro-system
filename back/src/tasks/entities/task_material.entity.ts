import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Task} from "./task.entity";
import {Material} from "../../materials/entities/material.entity";



@Entity({name:"task_material"})
export class TaskdMaterial {
    @PrimaryGeneratedColumn()
    id:number;
    @Column({nullable:true})
    plannedMaterialAmount:number; // calculated from currentConsumptionRate
    @Column({nullable:true})
    actualMaterialAmount:number;
    @Column({nullable:true})
    currentPrice:number;
    @Column({nullable:true})
    Package:string
    @Column({nullable:false})
    currentConsumptionRate:number //


    @ManyToOne(() => Task, task => task.taskMaterials,{onDelete:"CASCADE"})
    @JoinColumn({name:"task_id"})
    task: Task;
    @ManyToOne(() => Material, material => material.taskMaterials)
    @JoinColumn({name:"material_id"})
    material: Material;
}