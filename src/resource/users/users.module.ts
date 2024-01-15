import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { PrismaUsersRepository } from './repositories/prisma/PrismaUserRepository';
import { UsersRepository } from './repositories/user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    PrismaUsersRepository,
    { provide: UsersRepository, useClass: PrismaUsersRepository }
  ],
})
export class UsersModule { }
