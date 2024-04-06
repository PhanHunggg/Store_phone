import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 8080;

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors()

  app.use(express.static("."))

  const config = new DocumentBuilder().setTitle("Swagger").addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    'access-token').build()

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("swagger", app, document);

  await app.listen(port);


}
bootstrap();
