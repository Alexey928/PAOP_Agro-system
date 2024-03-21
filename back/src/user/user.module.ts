import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {FieldEntity} from "../field/entities/field.entity";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../auth/constans";

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports:[
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([FieldEntity]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),// as sample
  ],
  exports:[UserService],
})
export class UserModule {}
