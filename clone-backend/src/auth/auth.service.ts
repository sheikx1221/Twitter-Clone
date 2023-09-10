import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthLoginDto } from './dto/login.dto';
import { authConfig } from 'src/config/auth/auth';
import { AuthRegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private readonly userModal: Repository<User>
    ) { }

    async login(loginDTO: AuthLoginDto) {
        const user = await this.userModal
            .createQueryBuilder('user')
            .addSelect("user.password")
            .where(
                `user.email = :credential OR user.phone = :credential OR user.username = :credential`,
                { credential: loginDTO.credential }
            )
            .getOne();

        if (!user) throw new UnauthorizedException("Credentials are not valid");
        else {
            const matched = user.password === loginDTO.password;
            if (!matched) throw new UnauthorizedException("Invalid password!");

            const payload = { username: user.username, sub: user.id, email: user.email, phone: user.phone };
            
            delete user.password;
            return {
                ...user, access_token: this.jwtService.sign(payload, {
                    secret: authConfig.jwtSecret,
                    expiresIn: '24h'
                }),
            };
        }
    }

    async register(registerDto: AuthRegisterDto) {
        const user = await this.userModal.save(registerDto);

        const payload = { username: user.username, sub: user.id, email: user.email, phone: user.phone };
        const access_token = this.jwtService.sign(payload, {
            secret: authConfig.jwtSecret,
            expiresIn: '24h'
        });

        delete user.password;
        return {
            ...user, access_token: access_token,
        };
    }

    validateToken(token: string): boolean {
        try {
            const decoded = jwt.verify(token, authConfig.jwtSecret);
            return true;
        } catch (error) {
            return false;
        }
    }
}