import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as dotenv from 'dotenv';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { microserviceConfig } from './microserviceConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  dotenv.config();
  app.use(morgan('dev'));
  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    }),
  );

  app.connectMicroservice(microserviceConfig);

  await app.startAllMicroservicesAsync();
  
  await app.listen(process.env.PORT);
}
bootstrap();
