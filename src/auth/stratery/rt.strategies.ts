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
            jwtFromRequest: (req: Request) => {
                const refreshToken = req?.get('RefreshToken');
                if (refreshToken) {
                    return refreshToken;
                }
                return null;
            },
            secretOrKey: config.get<string>('RT_SECRET'),
            passReqToCallback: true
        })
    }

    validate(req: Request, payload: JwtPayload): JwtPayloadWithRt {
        const refreshToken = req?.get('RefreshToken');
        if (!refreshToken) {
            throw new ForbiddenException('Refresh token malformed');
        }
        console.log({ ...payload, refreshToken })
        return {
            ...payload,
            refreshToken
        };
    }
}