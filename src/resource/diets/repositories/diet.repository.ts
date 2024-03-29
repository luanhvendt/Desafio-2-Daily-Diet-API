import { QueryDietDto } from "../dto/query-diet-dto";
import { UpdateMealDto } from "../dto/updateMeal";
import { DietEntity } from "../entities/diet.entity";

export abstract class DietsRepository {
    abstract create(data: DietEntity): Promise<DietEntity>
    abstract findAll(query: QueryDietDto): Promise<any>
    abstract findUnique(id: string): Promise<DietEntity>
    abstract findSummary(sessionId: string): any
    abstract update(id: string, dataDiet: UpdateMealDto): Promise<UpdateMealDto>
    abstract delete(id: string): Promise<void>
}