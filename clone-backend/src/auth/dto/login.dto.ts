import { IsStrongPassword } from 'class-validator';
import { IsStringOrEmailOrPhone } from '../../decorators/isStringEmailPhone';

export class AuthLoginDto {
    @IsStringOrEmailOrPhone()
    credential: string;
    
    @IsStrongPassword()
    password: string;
}