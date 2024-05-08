import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

import {FieldEntity} from "../../field/entities/field.entity";
import {ApiProperty} from "@nestjs/swagger";
@Entity({name:"Perimeter_history"})

export class IfieldPerimeterEntity {
    @ApiProperty({example:"1",description:"unik ID"})
    @PrimaryGeneratedColumn({name:"FieldPerimeter_id"})
    id:number
    @Column()
    sqere:number
    @Column()
    trajectory:string
    @CreateDateColumn()
    validFrom:Date
    @ManyToOne(()=>FieldEntity,(field)=>field.perimeters,{onDelete:"CASCADE"})
    @JoinColumn({name:'field_id'})
    field:FieldEntity

}

