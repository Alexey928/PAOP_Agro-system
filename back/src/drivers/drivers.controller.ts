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
  UseGuards,
  SetMetadata
} from '@nestjs/common';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RoleGuard} from "../../Guards/role.guard";
import {ROOLS} from "../commonEnums";
import {ApiTags} from "@nestjs/swagger";

@ApiTags("Driver API endpoint")
@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard)
  @SetMetadata('requiredRole', ["GENERAL_AGRONOMIST"])
  @Post()
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driversService.create(createDriverDto);
  }
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard)
  @SetMetadata('requiredRole', [ROOLS.GeneralAgronomist])
  @Get()
  findAll() {
    return this.driversService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard)
  @SetMetadata('requiredRole', [ROOLS.GeneralAgronomist])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driversService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard)
  @SetMetadata('requiredRole', [ROOLS.GeneralAgronomist])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driversService.update(+id, updateDriverDto);
  }
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard)
  @SetMetadata('requiredRole', [ROOLS.GeneralAgronomist])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driversService.remove(+id);
  }
}
