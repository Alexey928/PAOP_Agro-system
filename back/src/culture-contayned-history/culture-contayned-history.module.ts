import { Module } from '@nestjs/common';
import { CultureContaynedHistoryService } from './culture-contayned-history.service';
//import { CultureContaynedHistoryController } from './culture-contayned-history.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../auth/constans";
import {CultureContaynedHistoryEntity} from "./entities/culture-contayned-history.entity";

@Module({
  // controllers: [CultureContaynedHistoryController],
  providers: [CultureContaynedHistoryService],
  imports:[TypeOrmModule.forFeature([CultureContaynedHistoryEntity]),JwtModule.register({
    secret: jwtConstants.secret,
  })],
  exports:[CultureContaynedHistoryService]
})

export class CultureContaynedHistoryModule {}
