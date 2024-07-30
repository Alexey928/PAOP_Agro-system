import { Module } from '@nestjs/common';
import { FieldService } from './field.service';
import { FieldController } from './field.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {FieldEntity} from "./entities/field.entity";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../auth/constans";

@Module({
  controllers: [FieldController],
  providers: [FieldService],
  imports:[TypeOrmModule.forFeature([FieldEntity]),JwtModule.register({
    secret: jwtConstants.secret,
  })],
  exports:[FieldService]
})

export class FieldModule {}
