import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../type/jwtPayload.type';
import { JwtPayloadWithRt } from '../type/jwt-payload-rt';
import { Request } from 'express';
@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-rt') {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get<string>('RT_SECRET'),
            passReqToCallback: true
        })
    }

    validate(req: Request, payload: JwtPayload): JwtPayloadWithRt {
        const refreshToken = req?.get('refreshToken')?.replace('Bearer', '').trim();
        if (!refreshToken) throw new ForbiddenException('Refresh token malformed')

        return {
            ...payload,
            refreshToken
        }
    }
}