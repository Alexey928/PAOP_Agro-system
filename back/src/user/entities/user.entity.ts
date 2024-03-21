import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class User {
    @ApiProperty({example:"1",description:"unik ID"})
    @PrimaryGeneratedColumn({name:"User_id"})
    id:number
    @ApiProperty({example:"Bob Marly",description:"user name"})
    @Column({nullable:true})
    name:string
    @ApiProperty({example:"MiSteRyBOB@ukr.net",description:"user email "})
    @Column()
    email:string;
    @ApiProperty({example:"User_Random_pas",description:"User password "})
    @Column()
    password:string;
    @ApiProperty({
        example:"GENERAL_AGRONOMIST",
        description:"It's can be one of them [GENERAL_AGRONOMIST,SIMPLE_AGRONOMIST,ACCOUNTANT,ADMIN]",
    })
    @Column()
    role:string
    @CreateDateColumn()
    createdAt:Date;
    @UpdateDateColumn()
    updatedAt:Date;
}
