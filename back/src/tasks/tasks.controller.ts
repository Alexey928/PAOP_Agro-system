import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
  BadRequestException
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import {
  bindMachinesTotaskDTO,
  bindMaterialToTaskDTO,
  CreateTaskDto,
} from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {ApiTags} from "@nestjs/swagger";
import {Task_bindingService} from "./task_binding.service";

@ApiTags("Tasks API endpoint ")
@Controller('tasks')
export class TasksController {
  constructor(
      private readonly tasksService: TasksService,
      private readonly task_bindingService:Task_bindingService
  ) {}
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }
  @Patch("bind-material")
  @UsePipes(new ValidationPipe())
  bindMaterialWidthAmountToTask(@Body() bindingMaterials:bindMaterialToTaskDTO){
    if(!bindingMaterials.materialsTascsAmount) throw new BadRequestException()
    this.task_bindingService.enrollTaskWdthMaterials(bindingMaterials.taskId,bindingMaterials.materialsTascsAmount)
    return "join";
  }
  @Patch("bind-machines")
  @UsePipes(new ValidationPipe())
  bindMachinesWidthMachine_MaterialAmountAndDriver(@Body() bindingMachinesData:bindMachinesTotaskDTO){
    if(!bindingMachinesData.machinesData) throw new BadRequestException("data is empty");

  }
  @Get()
  findAll(@Query() queryParams: {from:Date,to:Date}) {
    return this.tasksService.findAll(
        queryParams.from ?? new Date(),
        queryParams.to ?? new Date()
    );
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }

}
