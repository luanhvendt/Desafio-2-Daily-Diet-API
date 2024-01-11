import { QueryUserDto } from "../dto/query-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class UsersRepository {
    abstract create(data: UserEntity): Promise<UserEntity>
    abstract findAll(query: QueryUserDto): Promise<any>
    abstract findUnique(id: string): Promise<UserEntity>
    abstract update(id: string, dataUser: UpdateUserDto): Promise<UpdateUserDto>
    abstract delete(id: string): Promise<void>
}