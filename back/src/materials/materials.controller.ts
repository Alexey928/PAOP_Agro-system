import {Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import {ApiTags} from "@nestjs/swagger";
@ApiTags("Material API endpoint ")
@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}
  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialsService.create(createMaterialDto);
  }
  @Get()
  findAll(@Query() queryParams:{type?:string,minPrice?:number}) {
    return this.materialsService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaterialDto: UpdateMaterialDto) {
    return this.materialsService.update(+id, updateMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialsService.remove(+id);
  }
}
