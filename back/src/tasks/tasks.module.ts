import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import {TaskBindingModule} from "./material_task.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Task} from "./entities/task.entity";
import {TaskdMaterial} from "./entities/task_material.entity";
import {CultureContaynedHistoryModule} from "../culture-contayned-history/culture-contayned-history.module";


@Module({
  imports:[TypeOrmModule.forFeature([Task,TaskdMaterial,]),TaskBindingModule, CultureContaynedHistoryModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
