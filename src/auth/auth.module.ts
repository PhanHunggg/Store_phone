import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './stratery/at.stratery';
import { JwtPublicStrategy } from './stratery/jwt-public.stratery';
import { AuthRepository } from './auth.repository';
import { OrderRepository } from 'src/order/order.repository';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtPublicStrategy, AuthRepository, OrderRepository]
})
export class AuthModule {}
