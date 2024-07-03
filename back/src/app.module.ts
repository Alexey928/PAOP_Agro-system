import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FieldModule } from './field/field.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { join } from "path";
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { IfieldPerimetrModule } from './ifield-perimetr/ifield-perimetr.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { MaterialsModule } from './materials/materials.module';
import { MachineModule } from './machine/machine.module';
import { DriversModule } from './drivers/drivers.module';

@Module({
  imports: [
    UserModule,
    FieldModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService):any => ({// !!! any ???
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        database: configService.get('DB_NAME'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        synchronize: true,
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      }),
      inject: [ConfigService],
    }),
    IfieldPerimetrModule,
    AuthModule,
    TasksModule,
    MaterialsModule,
    MachineModule,
    DriversModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
