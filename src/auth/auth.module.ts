import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './stratery/at.stratery';
import { AuthRepository } from './auth.repository';
import { RtStrategy } from 'src/auth/stratery/rt.strategies';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthRepository, RtStrategy]
})
export class AuthModule {}
