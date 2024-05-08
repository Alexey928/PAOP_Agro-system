import {BadRequestException, Injectable} from '@nestjs/common';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {FieldEntity} from "./entities/field.entity";

@Injectable()
export class FieldService {
  constructor(
      @InjectRepository(FieldEntity)
      private readonly fieldRepository:Repository<FieldEntity>
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
    }
    return await this.fieldRepository.save(newField);
  }

  async findAll() {
    return  await this.fieldRepository.find({
      relations: ['perimeters']
      //relations: ['perimeters', 'tasks', 'tasks.taskMaterials','tasks.taskMaterials.material']
    })
  }

  async findOne(id: number) {
    const field = await this.fieldRepository.findOne({ where: {id} ,relations:{perimeters:true,tasks:true}});
    if(!field) throw new BadRequestException(`Field with id ${id} not found`);
    return field
  }
  async update(id: number, updateFieldDto: UpdateFieldDto) {
    const updatebleField = await this.fieldRepository.findOne({where:{id}});
    const nameMatchingField = await this.fieldRepository.findOne({where:{name:updateFieldDto.name}})
    if (!updatebleField) {
      throw new BadRequestException(`Field with id ${id} not found`);
    }
    if(nameMatchingField && nameMatchingField.id!==id) {
      throw new BadRequestException(`Field width this name is already exist in base`);
    }
    await this.fieldRepository.update(id,
        {
                    name:updateFieldDto.name ?? updatebleField.name,
                    description:updateFieldDto.description ?? updatebleField.description,
                  });
    return await this.fieldRepository.findOne({where:{id}, relations: ['perimeters']});
  }
  async remove(id: number) {
    const field = await this.fieldRepository.findOne({where:{id}});
    if (!field) {
      throw new BadRequestException(`Field with id ${id} not found`);
    }
    return await this.fieldRepository.remove(field);
  }
}
