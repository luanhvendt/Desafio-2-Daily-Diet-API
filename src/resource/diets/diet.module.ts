import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { DietController } from './diet.controller';
import { DietService } from './diet.service';
import { PrismaDietsRepository } from './repositories/prisma/PrismaDietRepository';
import { DietsRepository } from './repositories/diet.repository';

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
