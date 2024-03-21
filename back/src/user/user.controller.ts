import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  SetMetadata
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {ApiOperation, ApiProperty, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./entities/user.entity";
import {RoleGuard} from "../../Guards/role.guard";
import {ROOLS} from "../commonEnums";

class CreateUserResponseDto {
  @ApiProperty()
  user: User;
  @ApiProperty()
  token: string = "JWT signature";
}

@ApiTags("User API endpoint ")
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({summary:" creating of User, Valid roll:[All]"})
  @ApiResponse({status:200,type:CreateUserResponseDto,description:"this token valid from free endpoint"})
  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({summary:" get all Users, Valid roll:[ADMIN]",description:" getting all users in system (JWT!!)"})
  @ApiResponse({status:200,type:[User],description:"found oll users"})

  @UseGuards(RoleGuard)
  @SetMetadata('requiredRole', [ROOLS.Admin])
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({summary:" get User by ID , Valid roll:[ADMIN]",description:"getting one user by ID  (JWT!!!)"})
  @UseGuards(RoleGuard)
  @SetMetadata('requiredRole', [ROOLS.Admin])
  @Get(':id')
  findOne(@Param('email') email: string) {
    console.log(`find id ${email}`)
    return this.userService.findOne(email);
  }

  @ApiOperation({summary:" remove  User by ID , Valid roll:[ADMIN]",description:" remove one user from system, by ID (JWT!!)"})
  @SetMetadata('requiredRole', [ROOLS.Admin])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
