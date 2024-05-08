import {BadRequestException, Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as argon2 from "argon2"
import {JwtService} from "@nestjs/jwt";
import {IUser} from "./types";

@Injectable()
export class AuthService{
  constructor(
      private readonly usersService:UserService,
      private readonly jwtService:JwtService
  ) {
  }
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email);
    if(!user){throw new BadRequestException("email  is  incorrect");}
    const passIsMatch = await argon2.verify(user.password,password);
    if (user && passIsMatch ) {
      return user;
    }
    throw new BadRequestException(" password are incorrect");
  }

  async login(user: IUser) {
    const {id,email,role,name} = user;
    return {
      id,
      email,
      role,
      name,
      token:this.jwtService.sign({id:user.id,email:user.email,role:user.role})
    }
  }
}
