import { IsString, MaxLength, IsEmail } from 'class-validator';

export class UserSchema {
    @IsString()
    @MaxLength(120)
    name: string;

    @IsString()
    @IsEmail()
    @MaxLength(255)
    email: string;
}