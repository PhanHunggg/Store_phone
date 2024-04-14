import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {  Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';
import * as morgan from 'morgan-body';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 8080;

  app.useGlobalPipes(new ValidationPipe());

  const logger = app.get(Logger);
  (morgan as any)(app.getHttpAdapter().getInstance(), {
    stream: {
      write: (message: string) => {
        logger.log(message.replace('\n', ''));
        return true;
      },
    },
  });

  app.use(helmet());
  app.use(compression());
  app.enableCors()

  app.use(express.static("."))

  const config = new DocumentBuilder().setTitle("Swagger").addBearerAuth().build()

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("swagger", app, document);

  await app.listen(port);


}
bootstrap();
