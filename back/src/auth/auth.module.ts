import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UserModule} from "../user/user.module";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./local.srtategy";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./constans";
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports: [
          UserModule,
          PassportModule,
          JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1200s' },
        }),
      ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy],
})
export class AuthModule {}
