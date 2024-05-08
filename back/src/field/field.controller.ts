import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  SetMetadata,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import {FieldService} from './field.service';
import {CreateFieldDto} from './dto/create-field.dto';
import {UpdateFieldDto} from './dto/update-field.dto';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RoleGuard} from "../../Guards/role.guard";
import {ROOLS} from "../commonEnums";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {FieldEntity} from "./entities/field.entity";


@ApiTags("Field API endpoint ")
@ApiBearerAuth()
@Controller('fields')
export class FieldController {
  constructor(
      private readonly fieldService: FieldService,
  ) {}

  @Post()
  @ApiOperation({summary:" creating of Field, Valid roll:[GENERAL_AGRONOMIST]"})
  @ApiResponse({status:200,type:FieldEntity,description:""})
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard)
  @SetMetadata('requiredRole', [ROOLS.GeneralAgronomist, ROOLS.Accountant])
  create(@Body() createFieldDto: CreateFieldDto) {
    return this.fieldService.create(createFieldDto);
  }
  @Get()
  @ApiOperation({summary:" get all Field, Valid roll:[All]"})
  @ApiResponse({status:200,type:[FieldEntity],description:"All field"})
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.fieldService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary:" get one Field, Valid roll:[All]"})
  @ApiResponse({status:200,type:FieldEntity,description:""})
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.fieldService.findOne(+id);
  }
  @Patch(':id')
  @ApiOperation({summary:" update Field, Valid roll:[GENERAL_AGRONOMIST]"})
  @ApiResponse({status:200,type:FieldEntity,description:""})
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard)
  @SetMetadata('requiredRole', [ROOLS.GeneralAgronomist])
  update(@Param('id') id: string, @Body() updateFieldDto: UpdateFieldDto) {
    return this.fieldService.update(+id, updateFieldDto);
  }
  @Delete(':id')
  @ApiOperation({summary:"delete Field , Valid roll:[GENERAL_AGRONOMIST], IMPORTANT!! After deleting field, all task width status 'is done', dont remove from base. But all FieldPerimetersHistory wil be removed from base" })
  @ApiResponse({status:200,type:FieldEntity,description:""})
  @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
  @SetMetadata('requiredRole', [ROOLS.GeneralAgronomist])
  remove(@Param('id') id: string) {
    return this.fieldService.remove(+id);
  }
}
