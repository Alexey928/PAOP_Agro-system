import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Task} from "../../tasks/entities/task.entity";
import {TaskdMaterial} from "../../tasks/entities/task_material.entity";
@Entity({name:"Material"})
export class Material {
    @PrimaryGeneratedColumn()
    id:number
    @Column({type:"text",nullable:true})
    name:string;

    @Column({type:"text",nullable:true})
    description:string;

    @Column({nullable:true})
    price:number;

    @Column({type:"text",nullable:true})
    type:string//

    @Column({type:"text",nullable:true})
    metadata:string;// для посевмата например єто поле можно заполнить цветом, по которому раскрасятся поля. для химии тут можно хранить ссылку на сайт производителя и тд.

    // @ManyToMany(()=>Task,(task)=>task.materials,{nullable:true})
    // tasks:Task[]
    @OneToMany(() => TaskdMaterial, taskMaterial => taskMaterial.material)
    taskMaterials: TaskdMaterial[];

}
