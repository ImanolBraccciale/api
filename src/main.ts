import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import connectDB from './config/db'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin:  true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(4000);
}
bootstrap();
