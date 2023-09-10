import { IsEmail, IsOptional, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class AuthRegisterDto {
    @IsString()
    fullName: string;
    
    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsPhoneNumber()
    phone: string;

    @IsStrongPassword()
    password: string;
}