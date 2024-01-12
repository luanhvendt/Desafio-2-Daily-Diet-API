import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";
import { QueryUserDto } from "../../dto/query-user.dto";
import { UpdateUserDto } from "../../dto/update-user.dto";
import { UserEntity } from "../../entities/user.entity";
import { UsersRepository } from "../user.repository";

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
    constructor(private prisma: PrismaService) { }

    async create(data: UserEntity) {
        const findedUser = await this.prisma.user.findUnique({
            where: {
                email: data.email,
            }
        })

        if (findedUser) {
            throw new BadRequestException('Email already exists.')
        }

        const user = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
            }
        })

        return user
    }

    async findAll(query: QueryUserDto) {
        let { page = 1, limit = 10, search = '' } = query;

        page = Number(page)
        limit = Number(limit)
        search = String(search);

        const skip = (page - 1) * limit;

        const total = await this.prisma.user.count({
            where: {
                OR: [
                    {
                        name: {
                            contains: search,
                        },
                    },
                    {
                        email: {
                            contains: search,
                        },
                    },
                ]
            }
        })

        const users = await this.prisma.user.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: search,
                        },
                    },
                    {
                        email: {
                            contains: search,
                        },
                    },
                ],
            },
            skip,
            take: limit,
        })

        return {
            total,
            page,
            search,
            limit,
            pages: Math.ceil(total / limit),
            data: users
        }
    }

    async findUnique(id: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            }
        })

        return user
    }

    async update(id: string, dataUser: UpdateUserDto) {
        const user = await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                name: dataUser.name,
                email: dataUser.email,
                password: dataUser.password,
            }
        })

        return user
    }

    async delete(id: string) {
        await this.prisma.refreshToken.deleteMany({
            where: {
                userId: id,
            }
        })

        const user = await this.prisma.user.delete({
            where: {
                id: id,
            }
        })
    }
}