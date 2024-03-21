import {Controller, Get, Post, Body, Param} from '@nestjs/common';
import { IfieldPerimetrService } from './ifield-perimetr.service';
import { CreateIfieldPerimetrDto } from './dto/create-ifield-perimetr.dto';

import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@ApiTags("Field API endpoint ")
@ApiBearerAuth()
@Controller('ifield-perimetr')
export class IfieldPerimetrController {
  constructor(private readonly ifieldPerimetrService: IfieldPerimetrService) {}

  @Post()
  create(@Body() createIfieldPerimetrDto: CreateIfieldPerimetrDto) {
    return this.ifieldPerimetrService.create(createIfieldPerimetrDto);
  }
  @Get()
  findAll() {
    return this.ifieldPerimetrService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ifieldPerimetrService.findOne(+id);
  }


}
