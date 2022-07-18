import { Injectable } from "@nestjs/common";
import { Strategy,ExtractJwt } from "passport-jwt";
import {PassportStrategy} from '@nestjs/passport'
import { request } from "http";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: 'super-secret-cow',
        });
      }
    
      async validate(payload: any) {
        console.log('validate', payload)
        return payload;
      }
    }