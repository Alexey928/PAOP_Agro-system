import {BadRequestException, Injectable} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {Task_bindingService} from "./task_binding.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Task} from "./entities/task.entity";
import {Between, Repository} from "typeorm";
import {TaskdMaterial} from "./entities/task_material.entity";
import {CultureContaynedHistoryModule} from "../culture-contayned-history/culture-contayned-history.module";
import {CultureContaynedHistoryService} from "../culture-contayned-history/culture-contayned-history.service";

// equal of front enum
export enum TypesOfTask  {
    "SHOWING_CROPS",
    "SHOWING_CROPS_WIDTH_FERTILYZE",
    "SPRAYING",
    "SOIL_WORKS",
    "FERTILIZATION",
    "HARVEST",
    "WINDROWING_OF_PERENNIALS",
    "MOWING_PERENNIALS",
    "BALINING_OF_PERENNIALS",
    "TRANPORTING",
    "SEED TREATMENT",
}


@Injectable()
export class TasksService {
  constructor(
      @InjectRepository(Task)
      private readonly TaskRepository:Repository<Task>,
      @InjectRepository(TaskdMaterial)
      private readonly taskMaterialRepo:Repository<TaskdMaterial>,
      private readonly taskBindingService:Task_bindingService,
      private readonly  cultureHistoryService:CultureContaynedHistoryService,

  ) {}

async create(createTaskDto: CreateTaskDto) {
    const newTask = {
      field:{id:+createTaskDto.fieldId},
      type:createTaskDto.type,
      from:createTaskDto.from,
      square:createTaskDto.square,
      comment:createTaskDto.coment ?? "comment about task,from ordinary agronomist",
      status:createTaskDto.status ?? "in_progres",
    }
    const Task = await this.TaskRepository.save(newTask);
    if(createTaskDto.materialIdes){
        await  this.taskBindingService.enrollTaskWdthMaterials(Task.id,createTaskDto.materialIdes);
    }

    const task = await this.TaskRepository.findOne({where:{id:Task.id},
        relations:["field","taskMaterials","taskMaterials.material"]
    });
    if(Task.type === "0" || Task.type==="1"){
       // this.cultureHistoryService.create({)})
    }

   return task
  }
  async findAll(from:Date, to:Date, fieldId?:number) {
      console.log(from,to)
      const tasks = await this.TaskRepository.find({where:{
          from:Between(from,to)},
          relations:{materials:true,taskMaterials:true,field:true}
      })
      tasks.forEach(it => it.materials.reverse())
    return tasks
  }
  async findOne(id: number) {
    return await this.TaskRepository.findOne({where:{id},relations:["taskMaterials","taskMaterials.material"]});
  }


   async update(id: number, updateTaskDto: UpdateTaskDto) {
      const updatebleTask =  await this.TaskRepository.findOne({where:{id}})
      if(!updatebleTask){throw new BadRequestException(`task width id = ${id} is not exist`)}
      await this.taskBindingService.enrollTaskWidthMachine(id,updateTaskDto.machineData);
      return `This action updates a #${id} task`;
   }

  async remove(id: number) {
      try {
          const task = await this.TaskRepository.findOne({where: {id}, relations: {taskMaterials: true}});
          if(task.status==="isDone") return new BadRequestException("its task in statistics , we can not remove")
          if (!task) return new BadRequestException(`task width id =${id} not exist`);
          const taskMaterials = await this.taskMaterialRepo.findBy({task:task});
          const remTaskMaterial = await this.taskMaterialRepo.remove(taskMaterials);
          const remTask = await this.TaskRepository.remove(task)
          return {task:remTask,materialAmount:remTaskMaterial}
      }catch (e){
          return new BadRequestException("ERROR!!"+e.message)
      }
  }
}


