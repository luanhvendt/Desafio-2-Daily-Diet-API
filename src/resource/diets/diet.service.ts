import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { DietsRepository } from './repositories/diet.repository';

interface Diet {
  name: string;
  description: string;
  onTheDiet: string;
  date?: Date;
}

@Injectable()
export class DietService {
  constructor(
    private dietsRepository: DietsRepository
  ) { }

  async create(data: Diet) {
    if (!data.name) {
      throw new Error('Name is required.')
    }

    if (!data.description) {
      throw new Error('Description is required.')
    }

    if (!data.onTheDiet) {
      throw new Error('OnTheDiet is required.')
    }

    const meal = await this.dietsRepository.create({
      id: randomUUID(),
      name: data.name,
      description: data.description,
      onTheDiet: data.onTheDiet,
      date: data.date,
    })

    return meal
  }

  async findAll() {
    const meals = await this.dietsRepository.findAll()

    return meals
  }

  async findUnique(id: string) {
    const meal = await this.dietsRepository.findUnique(id)

    if (!meal) {
      throw new BadRequestException('Meal not found.')
    }

    return meal
  }

  async update(id: string, data: Diet) {
    const meal = await this.dietsRepository.findUnique(id)

    if (!meal) {
      throw new BadRequestException('Meal not found.')
    }

    const updatedMeal = await this.dietsRepository.update(id, data)

    if (!data) {
      throw new Error('Data Meal is required.')
    }
  }

  async delete(id: string) {
    const meal = await this.dietsRepository.findUnique(id)

    if (!meal) {
      throw new BadRequestException('Meal not found.')
    }

    const deletedMeal = await this.dietsRepository.delete(id)

    return deletedMeal
  }
}