import { Injectable, UnauthorizedException } from '@nestjs/common';
// import users from './users.json';
import { AuthDto } from './dto';

//eslint-disable-next-line
// const users = require('../users.json');
import * as users from "../users.json"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (private jwtService: JwtService){

    }
    signinLocal(dto: AuthDto){
        //retrieve users
        const user = users.find(_user => _user.email === dto.email);
        console.log(dto.email )
        if (!user){
            throw new UnauthorizedException('Users does not exist');
        }
        if (user.password !== dto.password){
            throw new UnauthorizedException('Wrong password');
        }
        // return user;
        return this.signUser(user.id,user.email, 'user');
    }

    signupLocal(dto: AuthDto){}

    signUser(userId: number, email:string,type:string){
        return this.jwtService.sign({
            sub: userId,
            email,
            claim: type,
        })
    }
}
