import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { DietController } from './diet.controller';
import { DietService } from './diet.service';
import { DietsRepository } from './repositories/diet.repository';
import { PrismaDietsRepository } from './repositories/prisma/PrismaDietRepository';

@Module({
  controllers: [DietController],
  providers: [
    DietService,
    PrismaService,
    PrismaDietsRepository,
    { provide: DietsRepository, useClass: PrismaDietsRepository },
  ],
})
export class DietModule { }
