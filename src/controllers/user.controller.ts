import { Body, Controller, Get, Post, HttpException, HttpStatus } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { UserSchema } from "src/schemas/user.schema";


@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    public async getAllUsers() {
        try {
            const users = await this.userService.getAllUsers();
            return users;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @Post()
    // private async createUser(@Body() body: UserSchema): Promise<any> {
    //     return this.userService.createUser(body)
    // }

}