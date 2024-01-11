import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository
  ) { }

  async create(data: CreateUserDto) {
    if (!data.email) {
      throw new Error('Email is required.')
    }

    if (!data.name) {
      throw new Error('Name is required.')
    }

    if (!data.password) {
      throw new Error('Password is required.')
    }

    const user = await this.usersRepository.create({
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
    })

    return user
  }

  async findAll(query: QueryUserDto) {
    const users = await this.usersRepository.findAll(query)

    return users
  }

  async findUnique(id: string) {
    const user = await this.usersRepository.findUnique(id)

    if (!user) {
      throw new BadRequestException('User not found.')
    }

    return user
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.usersRepository.findUnique(id)

    if (!user) {
      throw new BadRequestException('User not found.')
    }

    const updatedUser = await this.usersRepository.update(id, data)
  }

  async delete(id: string) {
    const user = await this.usersRepository.findUnique(id)

    if (!user) {
      throw new BadRequestException('User not found.')
    }

    const deletedUser = await this.usersRepository.delete(id)

    return deletedUser
  }
}
