import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";
import { QueryDietDto } from "../../dto/query-diet-dto";
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
                sessionId: data.sessionId,
            }
        })

        return meal
    }

    async findAll(query: QueryDietDto) {
        let { page = 1, limit = 10, search = '' } = query;

        page = Number(page)
        limit = Number(limit)
        search = String(search);

        const skip = (page - 1) * limit;

        const total = await this.prisma.diet.count({
            where: {
                OR: [
                    {
                        name: {
                            contains: search,
                        },
                    },
                    {
                        description: {
                            contains: search,
                        },
                    },
                    {
                        description: {
                            contains: search,
                        },
                        onTheDiet: {
                            contains: search,
                        }
                    },
                ]
            }
        })

        const meals = await this.prisma.diet.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: search,
                        },
                    },
                    {
                        description: {
                            contains: search,
                        },
                    },
                    {
                        description: {
                            contains: search,
                        },
                        onTheDiet: {
                            contains: search,
                        }
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
            data: meals
        }
    }

    async findUnique(id: string) {
        const meal = await this.prisma.diet.findUnique({
            where: {
                id,
            }
        })

        return meal
    }

    async findSummary(sessionId: string) {
        const meals = await this.prisma.diet.findMany({
            where: {
                sessionId,
            }
        })

        if (meals.length === 0) {
            throw new BadRequestException('SessionId not found.')
        }

        const totalMeals = meals.length
        const dietMeals = meals.filter((meal) => meal.onTheDiet === "Y")
        const nonDietMeals = meals.filter((meal) => meal.onTheDiet === "N")


        let bestDietSequence = ''
        let currentDietSequence = ''
        let currentDietSequenceCount = 0

        for (const meal of meals) {
            if (meal.onTheDiet === 'Y') {
                currentDietSequenceCount++
            } else {
                if (
                    currentDietSequenceCount > bestDietSequence.split(' -> ').length
                ) {
                    bestDietSequence = currentDietSequence
                }
                currentDietSequence = ''
                currentDietSequenceCount = 0
            }
        }

        return {
            totalMeals,
            onTheDietMeals: dietMeals.length,
            nonTheDietMeals: nonDietMeals.length,
            DietSequence: currentDietSequenceCount,
        }
    }

    // async findSummary(sessionId: string) {
    //     const meals = await this.prisma.diet.findMany({
    //         where: {
    //             sessionId,
    //         }
    //     })

    //     const totalMeals = meals.length
    //     const dietMeals = meals.filter((meal) => meal.onTheDiet === "Y")
    //     const nonDietMeals = meals.filter((meal) => meal.onTheDiet === "N")

    //     let bestDietSequence = ''
    //     let currentDietSequence = ''
    //     let currentDietSequenceCount = 0

    //     for (const meal of meals) {
    //         if (meal.onTheDiet === 'Y') {
    //             currentDietSequenceCount++
    //         } else {
    //             if (
    //                 currentDietSequenceCount > bestDietSequence.split(' -> ').length
    //             ) {
    //                 bestDietSequence = currentDietSequence
    //             }
    //             currentDietSequence = ''
    //             currentDietSequenceCount = 0
    //         }
    //     }

    //     return {
    //         totalMeals,
    //         onTheDietMeals: dietMeals.length,
    //         nonTheDietMeals: nonDietMeals.length,
    //         DietSequence: currentDietSequenceCount,
    //     }
    // }


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