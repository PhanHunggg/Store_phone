import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
declare const JwtPublicStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtPublicStrategy extends JwtPublicStrategy_base {
    constructor(config: ConfigService);
    validate(payload: any): Promise<any>;
}
export {};
