import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";

@Controller('user')
export class LoginUsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }
}