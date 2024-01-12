import { InMemoryDietsRepository } from '../../../test/repositories/InMemoryDietsRepository';
import { DietService } from './diet.service';

describe('DietService', () => {
  it('should be able to create a new meal', async () => {
    const inMemoryDietsRepository = new InMemoryDietsRepository()
    const dietsService = new DietService(inMemoryDietsRepository)

    await expect(dietsService.create({
      name: 'teste',
      description: 'arroz',
      onTheDiet: 'Y',
      sessionId: '123'
    }))
      .resolves
      .not
      .toThrow()

    expect(inMemoryDietsRepository.items).toEqual(expect.arrayContaining([
      expect.objectContaining({
        name: 'teste',
        description: 'arroz',
      }),
    ]))
  })

  it('should be able to find all meals', async () => {
    const inMemoryDietsRepository = new InMemoryDietsRepository()
    const dietsService = new DietService(inMemoryDietsRepository)

    await expect(dietsService.create({ name: 'teste1', description: 'arroz', onTheDiet: 'N' }))
      .resolves
      .not
      .toThrow()

    await expect(dietsService.create({ name: 'teste2', description: 'feijão', onTheDiet: 'Y' }))
      .resolves
      .not
      .toThrow()

    const allMeals = await inMemoryDietsRepository.findAll()

    expect(allMeals).toEqual(expect.arrayContaining([
      expect.objectContaining({
        name: 'teste1',
        description: 'arroz',
      }),
      expect.objectContaining({
        name: 'teste2',
        description: 'feijão'
      })
    ]))
  })

  it('should be able to find an unique meal', async () => {
    const inMemoryDietsRepository = new InMemoryDietsRepository()
    const dietsService = new DietService(inMemoryDietsRepository)

    const meal1 = dietsService.create({ name: 'teste1', description: 'arroz', onTheDiet: 'N' })
    const meal2 = dietsService.create({ name: 'teste2', description: 'feijão', onTheDiet: 'Y' })

    await expect(meal1)
      .resolves
      .not
      .toThrow()

    await expect(meal2)
      .resolves
      .not
      .toThrow()

    const meal = await dietsService.findUnique((await meal2).id)

    expect(meal).toEqual(
      expect.objectContaining({
        name: 'teste2',
        description: 'feijão'
      }))
  })

  it('should be able to delete a meal', async () => {
    const inMemoryDietsRepository = new InMemoryDietsRepository()
    const dietsService = new DietService(inMemoryDietsRepository)

    const meal = dietsService.create({ name: 'teste1', description: 'arroz', onTheDiet: 'N' })

    const response = await expect(meal)
      .resolves
      .not
      .toThrow()

    await expect(dietsService.delete((await meal).id))

    expect(inMemoryDietsRepository.items).not.toEqual(expect.arrayContaining([
      expect.objectContaining({
        name: 'teste1',
        description: 'arroz',
      }),
    ]))
  })
});
