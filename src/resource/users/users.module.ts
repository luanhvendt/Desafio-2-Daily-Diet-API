import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { LoginUsersController } from './login-users.controller';
import { PrismaUsersRepository } from './repositories/prisma/PrismaUserRepository';
import { UsersRepository } from './repositories/user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    controllers: [UsersController, LoginUsersController],
    providers: [
        UsersService,
        PrismaService,
        PrismaUsersRepository,
        { provide: UsersRepository, useClass: PrismaUsersRepository }
    ],
})
export class UsersModule { }
