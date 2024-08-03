import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {FieldEntity} from "../../field/entities/field.entity";

@Entity({name:"cultureContainedHistory"})
export class CultureContaynedHistoryEntity {
    @PrimaryGeneratedColumn()
    id:number
    @Column({nullable:false})
    culture:string
    @Column({nullable:false})
    sqere:number
    @Column({nullable:false})
    from:Date
    @Column({nullable:false})
    cultureYearCount:string
    @ManyToOne(()=>FieldEntity,(field)=>field.perimeters,{onDelete:"CASCADE"})
    @JoinColumn({name:'field_id'})
    field:FieldEntity
}
