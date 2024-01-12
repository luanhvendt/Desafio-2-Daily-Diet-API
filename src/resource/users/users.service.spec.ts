import { InMemoryUsersRepository } from "../../../test/repositories/InMemoryUsersRepository";
import { UsersService } from "./users.service";

describe('UsersService', () => {
  it('shoulg be able to create a new user', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const usersService = new UsersService(inMemoryUsersRepository)

    await expect(usersService.create({
      name: 'teste',
      email: 'teste@mail.com',
      password: '123456'
    }))
      .resolves
      .not
      .toThrow()

    expect(inMemoryUsersRepository.items).toEqual(expect.arrayContaining([
      expect.objectContaining({
        email: 'teste@mail.com',
      })
    ]))
  })

  it('should not be able to create a new user with same email', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const usersService = new UsersService(inMemoryUsersRepository)

    await expect(usersService.create({ name: 'teste', email: 'teste@mail.com', password: '123456' }))
      .resolves
      .not
      .toThrow()

    await expect(usersService.create({ name: 'teste', email: 'teste@mail.com', password: '123456' }))
      .rejects
      .toThrow()

    expect(inMemoryUsersRepository.items).toHaveLength(1)
  })

  it('should be able to find all users', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const usersService = new UsersService(inMemoryUsersRepository)

    await expect(usersService.create({ name: 'teste1', email: 'teste1@mail.com', password: '123456' }))
      .resolves
      .not
      .toThrow()

    await expect(usersService.create({ name: 'teste2', email: 'teste2@mail.com', password: '123456' }))
      .resolves
      .not
      .toThrow()

    const allUsers = await inMemoryUsersRepository.findAll()

    expect(allUsers).toEqual(expect.arrayContaining([
      expect.objectContaining({
        email: 'teste1@mail.com'
      }),
      expect.objectContaining({
        email: 'teste2@mail.com'
      })
    ]))
  })

  it('should be able to find an unique user', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const usersService = new UsersService(inMemoryUsersRepository)

    await expect(usersService.create({ id: '1', name: 'teste1', email: 'teste1@mail.com', password: '123456' }))
      .resolves
      .not
      .toThrow()

    await expect(usersService.create({ id: '2', name: 'teste2', email: 'teste2@mail.com', password: '123456' }))
      .resolves
      .not
      .toThrow()

    const user = await usersService.findUnique('1')

    expect(user).toEqual(
      expect.objectContaining({
        email: 'teste1@mail.com'
      }),
    )
  })

  it('should be able to update a user', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const usersService = new UsersService(inMemoryUsersRepository)

    await expect(usersService.create({ id: '1', name: 'teste1', email: 'teste1@mail.com', password: '123456' }))
      .resolves
      .not
      .toThrow()

    await expect(usersService.update('1', { name: 'alterado', email: 'alterado@mail.com' }))
      .resolves
      .not
      .toThrow()

    expect(inMemoryUsersRepository.items).toEqual(expect.arrayContaining([
      expect.objectContaining({
        email: 'alterado@mail.com'
      })
    ]))
  })

  it('should not be able to update a user with invalid id', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const usersService = new UsersService(inMemoryUsersRepository)

    await expect(usersService.create({ id: '1', name: 'teste1', email: 'teste1@mail.com', password: '123456' }))
      .resolves
      .not
      .toThrow()

    await expect(usersService.update('aaaaa', { name: 'alterado', email: 'alterado@mail.com' }))
      .rejects
      .toThrow()

    expect(inMemoryUsersRepository.items).not.toEqual(expect.arrayContaining([
      expect.objectContaining({
        email: 'alterado@mail.com'
      })
    ]))
  })

  it('should be able to delete a task', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const usersService = new UsersService(inMemoryUsersRepository)

    await expect(usersService.create({ id: '1', name: 'teste1', email: 'teste1@mail.com', password: '123456' }))
      .resolves
      .not
      .toThrow()

    await expect(usersService.delete('1'))
      .resolves
      .not
      .toThrow()

    expect(inMemoryUsersRepository.items).not.toEqual(expect.arrayContaining([
      expect.objectContaining({
        email: 'teste1@mail.com',
      })
    ]))
  })
});
