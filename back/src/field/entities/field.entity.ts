import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

import {IfieldPerimeterEntity} from "../../ifield-perimetr/entities/ifield-perimetr.entity";
import {Task} from "../../tasks/entities/task.entity";
import {ApiProperty} from "@nestjs/swagger";
import {CultureContaynedHistoryEntity} from "../../culture-contayned-history/entities/culture-contayned-history.entity";

@Entity({name:"Field"})// name of database table
export class FieldEntity {
    @ApiProperty({example:"1",description:"unik ID"})
    @PrimaryGeneratedColumn()//id auto generator as counter
    id:number
    @ApiProperty({example:[{...new IfieldPerimeterEntity(),id:"1"}],description:"relation Field Perimeter history entity"})
    @OneToMany(
        ()=>IfieldPerimeterEntity,
        (perimeterHistory)=>perimeterHistory.field,
        {onDelete:"CASCADE"}
        )
    perimeters:IfieldPerimeterEntity[];

    @OneToMany(()=>CultureContaynedHistoryEntity,
        (cultureContaynedHistory)=>cultureContaynedHistory.field,
        {onDelete:"CASCADE"}
    )
    cultureContainHistory:CultureContaynedHistoryEntity[]

    @ApiProperty({example:[{...new Task(),id:"1"}],description:"relation Task"})

    @OneToMany(
        ()=>Task,(task)=>task.field,{onDelete:"SET NULL"}
    )
    tasks:Task[]

    @ApiProperty({example:"some field name",description:"field name"})
    @Column({type:"text",nullable:true})
    name:string;

    @ApiProperty({example:"some description about field",description:"unik ID"})
    @Column({type:"text",nullable:true})
    description:string

    @Column({type:"text",nullable:true})
    fillColor:string

    @Column({type:"float",nullable:true})
    currentFreeSqere:number

    @Column({type:"float",nullable:true})
    startFreeSqere:number
}
