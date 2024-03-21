import { Injectable } from '@nestjs/common';
import { CreateIfieldPerimetrDto } from './dto/create-ifield-perimetr.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {IfieldPerimeterEntity} from "./entities/ifield-perimetr.entity";
import {Repository} from "typeorm";


@Injectable()
export class IfieldPerimetrService {
  constructor(@InjectRepository(IfieldPerimeterEntity) private readonly repository:Repository<IfieldPerimeterEntity>) {}

 async create(createIfieldPerimetrDto: CreateIfieldPerimetrDto) {
    const newPerimetr = {
      sqere:createIfieldPerimetrDto.sqere ?? 0,
      trajectory:createIfieldPerimetrDto.trajectory,
      field:{id:+createIfieldPerimetrDto.fieldId}
    }
    return await this.repository.save(newPerimetr);
  }

  findAll() {
    return `This action returns all ifieldPerimetr`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ifieldPerimetr`;
  }


}
