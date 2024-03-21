import { Module } from '@nestjs/common';
import { IfieldPerimetrService } from './ifield-perimetr.service';
import { IfieldPerimetrController } from './ifield-perimetr.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {IfieldPerimeterEntity} from "./entities/ifield-perimetr.entity";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../auth/constans";

@Module({
  imports:[TypeOrmModule.forFeature([IfieldPerimeterEntity]),JwtModule.register({
    secret: jwtConstants.secret,
  })],
  controllers: [IfieldPerimetrController],
  providers: [IfieldPerimetrService],
  exports:[IfieldPerimetrService]
})

export class IfieldPerimetrModule {}
