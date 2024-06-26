import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import { CategoryBrandModule } from './category-brand/category-brand.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ColorModule } from './color/color.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AtGuard } from './common/guards/at.guard';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
const path = require('node:path');
@Module({
  imports: [AuthModule, ConfigModule.forRoot({ isGlobal: true }), ProductModule, BrandModule, CategoryModule, CategoryBrandModule, CloudinaryModule, ColorModule, UserModule, OrderModule, MailerModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => ({
      transport: {
        host: config.get("MAIL_HOST"),
        secure: false,
        auth: {
          user: config.get("MAIL_USER"),
          pass: config.get("MAIL_PASS"),
        }
      },
      defaults: {
        from: `"No Reply" <${config.get("MAIL_FORM")}>`
      },
      template: {
        dir: path.resolve(__dirname, "../src/template-mail/email"),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      },
    }),
    inject: [ConfigService]
  }), ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'swagger-static'),
    serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger',
  }),]
  ,
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AtGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule { }
