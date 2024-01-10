import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";
import { UpdateMealDto } from "../../dto/updateMeal";
import { DietEntity } from "../../entities/diet.entity";
import { DietsRepository } from "../diet.repository";

@Injectable()
export class PrismaDietsRepository implements DietsRepository {
    constructor(private prisma: PrismaService) { }

    async create(data: DietEntity) {
        const meal = await this.prisma.diet.create({
            data: {
                name: data.name,
                description: data.description,
                onTheDiet: data.onTheDiet,
                date: data.date,
            }
        })

        return meal
    }

    async findAll() {
        const meals = await this.prisma.diet.findMany()

        return meals
    }

    async findUnique(id: string) {
        const meal = await this.prisma.diet.findUnique({
            where: {
                id,
            }
        })

        return meal
    }

    async update(id: string, dataDiet: UpdateMealDto) {
        const meal = await this.prisma.diet.update({
            where: {
                id,
            },
            data: {
                name: dataDiet.name,
                description: dataDiet.description,
                onTheDiet: dataDiet.onTheDiet,
                date: dataDiet.date,
            }
        })

        return meal
    }

    async delete(id: string): Promise<void> {
        const meal = await this.prisma.diet.delete({
            where: {
                id,
            }
        })
    }
}