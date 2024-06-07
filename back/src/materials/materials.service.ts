import {BadRequestException, Injectable} from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Material} from "./entities/material.entity";
import {LessThanOrEqual, Repository} from "typeorm";

@Injectable()
export class MaterialsService {
  constructor(@InjectRepository(Material) private materialsRepository:Repository<Material>) {
  }
   async create(createMaterialDto: CreateMaterialDto) {

      const exsExist =  this.materialsRepository.findBy({
          name:createMaterialDto.name,
        });
    if(!exsExist) return new BadRequestException("material width this name is exist")

    const newMaterial = {
      name:createMaterialDto.name,
      type:createMaterialDto.type,
      basePrice:createMaterialDto.basePrice??0,
      metadata:createMaterialDto.metadata?? "it's not important for this material type",
      cValue:createMaterialDto.cValue,
      massOfThousen:createMaterialDto.massOfThousen??0,
      subTypeName:createMaterialDto.subTypeName??"it's not important for this material type",
      packaging:createMaterialDto.packaging??"null"
    }

    return await this.materialsRepository.save(newMaterial);
  }
  async findAll(queryParams:{type?:string,minPrice?:number}) {
      if(!queryParams) return this.materialsRepository.find();
      if(queryParams.type && queryParams.minPrice){
          return await this.materialsRepository.findBy(
              {
                  type:queryParams.type,
                  basePrice:LessThanOrEqual(queryParams.minPrice),
              }
          );
      }
      if(queryParams.type){
          return await this.materialsRepository.findBy({type:queryParams.type})
      }
      if(queryParams.minPrice){
          return await this.materialsRepository.findBy({basePrice:LessThanOrEqual(queryParams.minPrice)})
      }
      return this.materialsRepository.find();
  }
  async findOne(id: number) {
      const material = await this.materialsRepository.findOne({where:{id}});
      if(!material) new BadRequestException(`material width id=${id} not exist`)
      return material
  }

 async update(id: number, updateMaterialDto: UpdateMaterialDto) {
      try {
          const  updatebleMaterial = await this.materialsRepository.findOne({where:{id}})
          const nameMachingMaterial = await this.materialsRepository.findOne({where:{name:updateMaterialDto.name}});
          if(!updatebleMaterial)  new BadRequestException(`material width id =${id} not exist`)
          if(updatebleMaterial && nameMachingMaterial.id!==id){
            new BadRequestException(`material width name: "${nameMachingMaterial.name}" is already exist`)
          }
          return this.materialsRepository.update(id,{
              name:updateMaterialDto.name ?? updatebleMaterial.name,
              type:updateMaterialDto.type ?? updatebleMaterial.type,
              cValue:updateMaterialDto.description?? updatebleMaterial.cValue,
              basePrice:updateMaterialDto.MaterialPrice?? updatebleMaterial.basePrice,
              metadata:updateMaterialDto.metadata?? updatebleMaterial.metadata,
              consumptionRate:updateMaterialDto.consumptionRate??updatebleMaterial.consumptionRate

          })
      }catch (e){
          throw new BadRequestException(`ERROR!! ${e.message}`)
      }
  }
 async remove(id: number) {
      const currentMaterial = await this.materialsRepository.findOne({where:{id},relations:{taskMaterials:true}});
      if(!currentMaterial)  throw new BadRequestException(`material width this id = ${id} is not exist`);
      if(currentMaterial.taskMaterials) throw new BadRequestException("this material was used in some task,first remove oll relations");
      return await this.materialsRepository.remove(currentMaterial);
  }
}

