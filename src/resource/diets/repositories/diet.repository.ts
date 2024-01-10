import { UpdateMealDto } from "../dto/updateMeal";
import { DietEntity } from "../entities/diet.entity";

export abstract class DietsRepository {
    abstract create(data: DietEntity): Promise<DietEntity>
    abstract findAll(): Promise<DietEntity[]>
    abstract findUnique(id: string): Promise<DietEntity>
    abstract findSummary(sessionId: string): any
    abstract update(id: string, dataDiet: UpdateMealDto): Promise<UpdateMealDto>
    abstract delete(id: string): Promise<void>
}