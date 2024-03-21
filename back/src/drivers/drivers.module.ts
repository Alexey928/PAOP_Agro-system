import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Driver} from "./entities/driver.entity";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../auth/constans";

@Module({
  imports:[TypeOrmModule.forFeature([Driver]),JwtModule.register({
    secret: jwtConstants.secret,
  })],
  controllers: [DriversController],
  providers: [DriversService],
})

export class DriversModule {}
