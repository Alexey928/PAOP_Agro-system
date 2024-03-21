import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { Task } from './entities/task.entity';
import { Material } from '../materials/entities/material.entity';
import {TaskdMaterial} from "./entities/task_material.entity";
import {machineData, maeterialPrice} from "./dto/create-task.dto";
import {Machine} from "../machine/entities/machine.entity";
import {Task_machineEntity} from "./entities/Task_machine.entity";

@Injectable()
export class Task_bindingService {
    constructor(
        @InjectRepository(Task)
        private TaskRepository: Repository<Task>,
        @InjectRepository(Material)
        private materialRepository: Repository<Material>,
        @InjectRepository(Machine)
        private machineRepository:Repository<Machine>,
        @InjectRepository(TaskdMaterial)
        private TaskMaterialRepository:Repository<TaskdMaterial>,
        @InjectRepository(Task_machineEntity)
        private TaskMachineRepository:Repository<Task_machineEntity>,
    ) {}

    async enrollTaskWdthMaterials(taskId: number, materialPrices: maeterialPrice[]):Promise<void> {
        const Task = await this.TaskRepository.findOne({where:{id:taskId}});
        console.log(Task);
        const materials =  materialPrices.map(it=>({...new Material(),id:it.id}))
        Task.materials = materials;
        const task = await this.TaskRepository.save(Task);
        for (let i=0;i<materialPrices.length;i++){
           await this.TaskMaterialRepository.save({
               material:task.materials[i],
               task:Task,
               plannedMaterialAmount:materialPrices[i].planedAmount
           });
        }
    }
    async enrollTaskWidthMachine(taskId: number,machineData:machineData[]){
        const Task = await this.TaskRepository.findOne({where:{id:taskId}});
        Task.machines = machineData.map((it)=>({...new Machine(),id:it.machineId}));
        const task = await this.TaskRepository.save(Task);
        for(let i =0; i<machineData.length; i++){
            await this.TaskMachineRepository.save({
                machine:task.machines[i],
                task:Task,
                plannedFuelAmount:machineData[i].planedFuelAmount,
                driver:{id:machineData[i].driverID}
            })
        }
    }

    // async getMaterialsForTask(taskId: number) {
    //     const task = await this.TaskRepository.findOne({where:{id:taskId},relations:{taskMaterials:true}});
    //     console.log(task);
    //     task.taskMaterials.forEach(t_m=>console.log(t_m.material.id));
    //     return task.taskMaterials;
    // }
    //
    // async getTasksForMaterial(materilId: number) {
    //     const material = await this.materialRepository.findOne({where:{id:materilId},relations:{tasks:true}});
    //     return material.tasks;
    // }
}
