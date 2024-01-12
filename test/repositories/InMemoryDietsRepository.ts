import { UpdateMealDto } from "src/resource/diets/dto/updateMeal";
import { DietEntity } from "src/resource/diets/entities/diet.entity";
import { DietsRepository } from "src/resource/diets/repositories/diet.repository";

export class InMemoryDietsRpeository implements DietsRepository {
    public items: any = []

    async create(data: DietEntity) {
        const user: DietEntity = {
            id: '1',
            name: data.name,
            description: data.description,
            onTheDiet: data.onTheDiet,
            sessionId: data.sessionId,
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

    async findSummary(sessionId: string) {
        const meals = this.items.filter((meal) => meal.sessionId === sessionId);

        const totalMeals = meals.length;
        const dietMeals = meals.filter((meal) => meal.onTheDiet === 'Y');
        const nonDietMeals = meals.filter((meal) => meal.onTheDiet === 'N');

        let bestDietSequence = '';
        let currentDietSequence = '';
        let currentDietSequenceCount = 0;

        for (const meal of meals) {
            if (meal.onTheDiet === 'Y') {
                currentDietSequenceCount++;
            } else {
                if (currentDietSequenceCount > bestDietSequence.split(' -> ').length) {
                    bestDietSequence = currentDietSequence;
                }
                currentDietSequence = '';
                currentDietSequenceCount = 0;
            }
        }

        return {
            totalMeals,
            onTheDietMeals: dietMeals.length,
            nonTheDietMeals: nonDietMeals.length,
            DietSequence: currentDietSequenceCount,
        };
    }

    async update(id: string, dataDiet: UpdateMealDto) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
                this.items[i].name = dataDiet.name
                this.items[i].description = dataDiet.description
                this.items[i].onTheDiet = dataDiet.onTheDiet
                this.items[i].date = dataDiet.date

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