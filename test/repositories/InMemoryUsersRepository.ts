import { BadRequestException } from "@nestjs/common";
import { UpdateUserDto } from "src/resource/users/dto/update-user.dto";
import { UserEntity } from "src/resource/users/entities/user.entity";
import { UsersRepository } from "src/resource/users/repositories/user.repository";

export class InMemoryUsersRepository implements UsersRepository {
    public items: any = []

    async create(data: UserEntity) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].email === data.email) {
                throw new BadRequestException('email already exists.')
            }
        }

        const user: UserEntity = {
            id: data.id,
            name: data.name,
            email: data.email,
            password: data.password
        }

        this.items.push(user)
        return user
    }

    async findAll() {
        return this.items
    }

    async findUnique(id: string) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
                return this.items[i]
            }
        }
    }

    async update(id: string, dataUser: UpdateUserDto) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
                this.items[i].name = dataUser.name
                this.items[i].email = dataUser.email
                this.items[i].password = dataUser.password
                this.items[i].newPassword = dataUser.newPassword

                return this.items[i]
            }
        }
    }

    async delete(id: string) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
                this.items.splice(i, 1);
            }
        }
    }
}