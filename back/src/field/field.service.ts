import {BadRequestException, Injectable} from '@nestjs/common';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {FieldEntity} from "./entities/field.entity";
import {CultureContaynedHistoryService} from "../culture-contayned-history/culture-contayned-history.service";

@Injectable()
export class FieldService {
  constructor(
      @InjectRepository(FieldEntity)
      private readonly fieldRepository:Repository<FieldEntity>,
      private readonly  cultureHistoryService:CultureContaynedHistoryService
  ) {};
  async create(createFieldDto: CreateFieldDto) {
    const exsExist = await this.fieldRepository.findBy({
       name:createFieldDto.name,
         }
     )
    if(exsExist.length){
      throw new BadRequestException("field with this name is already exist ")
    }
    const newField = {
      name:createFieldDto.name,
      description:createFieldDto.description,
      fillColor:createFieldDto.color??"#7bf606",
      currentFreeSqere:createFieldDto.currentFreeSqeare??100,
      startFreeSqere:createFieldDto.currentFreeSqeare??100
    }

    const field =  await this.fieldRepository.save(newField);
    await this.cultureHistoryService.create( {fieldId:field.id,culture:"none",
      sqere:createFieldDto.currentFreeSqeare,from:new Date(),cultureYearCount:""});


    return this.fieldRepository.findOne({where:{id:field.id},relations:['perimeters','cultureContainHistory']})
  }


  async findAll() {
    return  await this.fieldRepository.find({
      relations: ['perimeters','cultureContainHistory']
      //relations: ['perimeters', 'tasks', 'tasks.taskMaterials','tasks.taskMaterials.material']
    })
  }
  async findOne(id: number) {
    const field = await this.fieldRepository.findOne({ where: {id} ,
      relations:{perimeters:true,tasks:true,cultureContainHistory:true}});
    if(!field) throw new BadRequestException(`Field with id ${id} not found`);
    return field
  }
  async update(id: number, updateFieldDto: UpdateFieldDto) {
    const updatebleField = await this.fieldRepository.findOne({where:{id},relations:['perimeters']});
    const nameMatchingField = await this.fieldRepository.findOne({where:{name:updateFieldDto.name}})
    console.log(updatebleField.perimeters,"servise");
    if (!updatebleField) {
      throw new BadRequestException(`Field with id ${id} not found`);
    }
    if(nameMatchingField && nameMatchingField.id!==id) {
      throw new BadRequestException(`Field width this name is already exist in base`);
    }
    if(updatebleField.currentFreeSqere===updatebleField.startFreeSqere){
      await this.fieldRepository.update(id,
          {
            name:updateFieldDto.name ?? updatebleField.name,
            description:updateFieldDto.description ?? updatebleField.description,
            currentFreeSqere:updateFieldDto.sqere??updatebleField.perimeters[updatebleField.perimeters.length-1].sqere,
            startFreeSqere:updateFieldDto.sqere??updatebleField.perimeters[updatebleField.perimeters.length-1].sqere,
          });
    }else{
      throw new BadRequestException(`only for clear field`);
    }
    return await this.fieldRepository.findOne({ where:{id},relations: ['perimeters','cultureContainHistory']});
  }


  async remove(id: number) {
    const field = await this.fieldRepository.findOne({where:{id}});
    if (!field) {
      throw new BadRequestException(`Field with id ${id} not found`);
    }
    return await this.fieldRepository.remove(field);
  }
}
