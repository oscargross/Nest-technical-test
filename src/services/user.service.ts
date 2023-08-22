import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../models/user.entity";
import { UserSchema } from "src/schemas/user.schema";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async getAllUsers(): Promise<UserEntity[]> {
        try {            
            return  await this.userRepository.find();
        } catch (error) {
            console.error('Error while fetching users:', error);
            throw new InternalServerErrorException('Database connection error');
        }
    }
    // async createUser(body: UserSchema): Promise<UserEntity> {
    //     const newUser = this.userRepository.save(body);
    //     return newUser;
    // }
    
}
