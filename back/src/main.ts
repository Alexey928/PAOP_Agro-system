import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
async function bootstrap() {
  const config = new DocumentBuilder()
      .setTitle("Agro menagerie")
      .setDescription("API description")
      .setVersion("1.0.0")
      .addTag("AGRO")
      .addBearerAuth()
      .addServer("http://localhost:4000/api")
      .build()
  const app = await NestFactory.create(AppModule,{cors:true});
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup("/api/docs",app,document);
  app.setGlobalPrefix("api");
  app.enableCors();
  await app.listen(process.env.APP_PORT||4000);
  console.log("server was start")
}

bootstrap();

// let temp = 2000
// function tymeaut () {
//   setTimeout(()=>{
//     console.log(`is recursy ${temp}`)
//     temp+=1000;
//     tymeaut()
//   },temp);
// }

//tymeaut()