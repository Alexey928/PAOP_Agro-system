import { Injectable } from '@nestjs/common';
import { CreateCultureContaynedHistoryDto } from './dto/create-culture-contayned-history.dto';
import { UpdateCultureContaynedHistoryDto } from './dto/update-culture-contayned-history.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {CultureContaynedHistoryEntity} from "./entities/culture-contayned-history.entity";
import {Repository} from "typeorm";

@Injectable()
export class CultureContaynedHistoryService {
  constructor(@InjectRepository(CultureContaynedHistoryEntity) private readonly repository:Repository<CultureContaynedHistoryEntity>){}


  async create(createCultureContaynedHistoryDto: CreateCultureContaynedHistoryDto) {
    const newHistory = {
      culture:createCultureContaynedHistoryDto.culture??"none",
      sqere:createCultureContaynedHistoryDto.sqere,//??????
      from:createCultureContaynedHistoryDto.from ?? new Date(),
      cultureYearCount:createCultureContaynedHistoryDto.cultureYearCount??"one year"
    }
    return await this.repository.save(newHistory);
  }
}
