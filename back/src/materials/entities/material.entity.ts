import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {TaskdMaterial} from "../../tasks/entities/task_material.entity";
@Entity({name:"Material"})
export class Material {
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:"text",nullable:false})
    name:string;

    @Column({type:"text",nullable:false})
    subTypeName:string;

    @Column({type:"text",nullable:false})
    cValue:string;

    @Column({type:"text",nullable:false})
    consumptionRate:string

    @Column({type:"float",nullable:true})
    basePrice:number;

    @Column({type:"float",nullable:true})
    massOfThousen:number;

    @Column({type:"text",nullable:false})
    type:string//

    @Column({type:"text",nullable:true})
    metadata:string;// для посевмата например єто поле можно заполнить цветом, по которому раскрасятся поля. для химии тут можно хранить ссылку на сайт производителя и тд.

    @Column({type:"text",nullable:false})
    packaging:string
    // @ManyToMany(()=>Task,(task)=>task.materials,{nullable:true})
    // tasks:Task[]
    @OneToMany(() => TaskdMaterial, taskMaterial => taskMaterial.material)
    taskMaterials: TaskdMaterial[];

}
