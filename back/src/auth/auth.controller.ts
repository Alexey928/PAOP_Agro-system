import {Controller, Post, UseGuards, Request, Get, Body, BadRequestException} from '@nestjs/common';
import { AuthService } from './auth.service';

import {LocalAuthGuard} from "./local-auth.guard";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateAuthDto} from "./dto/create-auth.dto";

@ApiTags("Auth API endpoint ")
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)// banding  tu => local.strategy => valigate() => authService.validateUser()
  @ApiOperation({summary:"login "})
  @ApiResponse({status:200,type:CreateAuthDto,description:"this token valid from free endpoint"})
  @Post('login')
  async login(@Request() req, @Body() create:CreateAuthDto) {// @Body need hear for swagger
      if(!req){console.log("yes"); throw new BadRequestException("is not valid ")}
      return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
