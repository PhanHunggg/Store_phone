import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import { CategoryBrandModule } from './category-brand/category-brand.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ColorModule } from './color/color.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards/at.guards';


@Module({
  imports: [AuthModule, ConfigModule.forRoot({ isGlobal: true }), ProductModule, BrandModule, CategoryModule, CategoryBrandModule, CloudinaryModule, ColorModule, UserModule, OrderModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AtGuard
    }
  ],
})
export class AppModule { }
