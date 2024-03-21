import {BadRequestException, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {FieldEntity} from "../field/entities/field.entity";
import * as argon2 from "argon2"
import {JwtService} from "@nestjs/jwt";



// for password hashing

@Injectable()
export class UserService {
    constructor(
      @InjectRepository(User)
      private readonly userRepository:Repository<User>,
      @InjectRepository(FieldEntity) // as sample
      private readonly fieeldRepository:Repository<FieldEntity>,
      private readonly jwtService:JwtService
  ) {}

async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({where:{email:createUserDto.email}});
    if(existUser) throw new BadRequestException("This email already exist!");

    const user = await this.userRepository.save({
        email:createUserDto.email,
        name:createUserDto.name,
        password: await argon2.hash(createUserDto.password),
        role:createUserDto.password ==="ADMIN"?"ADMIN":createUserDto.role,
    })
     const token = this.jwtService.sign({email:createUserDto.email,role:user.role});
    return {user,token}
  };

  findAll() {
      return this.userRepository.find();
  };

   async findOne(email: string) {

    return await  this.userRepository.findOne({where:{email}});
  }


  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
