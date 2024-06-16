import {
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import {FieldEntity} from "../../field/entities/field.entity";
import {Material} from "../../materials/entities/material.entity";
import {JoinTable} from "typeorm";
import {TaskdMaterial} from "./task_material.entity";
import {Machine} from "../../machine/entities/machine.entity";
import {Task_machineEntity} from "./Task_machine.entity";
@Entity({name:"Task"})
export class Task {
    @PrimaryGeneratedColumn()
    id:number
    @Column({nullable:false})
    type:string
    @Column({nullable:false})
    from:Date
    @Column({nullable:true})
    to:Date
    @Column({nullable:false})
    status:string
    @Column({nullable:true})
    comment:string
    @ManyToOne(()=>FieldEntity,(field)=>field.tasks,{onDelete:"SET NULL",nullable:true})
    @JoinColumn({name:'field_id'})
    field:FieldEntity
    @ManyToMany(()=>Material)
    @JoinTable()
    materials:Material[]
    @ManyToMany(()=>Machine)
    @JoinTable()
    machines:Machine[]
    @OneToMany(() => TaskdMaterial, taskMaterial => taskMaterial.task,{onDelete:"CASCADE"})
    taskMaterials: TaskdMaterial[];
    @OneToMany(()=>Task_machineEntity,(task_machine)=>task_machine.task)
    taskMachines: Task_machineEntity[]
}
//     @JoinTable({
//     name:"task_material",
//     joinColumn:{
//         name:"task_id",
//         referencedColumnName:"id",
//
//     },
//     inverseJoinColumn:{
//         name:"material_id",
//         referencedColumnName:"id",
//
//     }
// })