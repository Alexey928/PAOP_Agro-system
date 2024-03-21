import {Module} from '@nestjs/common';
import {Task_bindingService} from "./task_binding.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Material} from "../materials/entities/material.entity";
import {Task} from "./entities/task.entity";
import {TaskdMaterial} from "./entities/task_material.entity";
import {Machine} from "../machine/entities/machine.entity";
import {Task_machineEntity} from "./entities/Task_machine.entity";


@Module({
    imports:[TypeOrmModule.forFeature([Material,Task,TaskdMaterial,Machine,Task_machineEntity])],
    providers: [Task_bindingService],
    exports:[Task_bindingService]
})
export class TaskBindingModule {}