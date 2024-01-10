import { Module } from '@nestjs/common';
import { DietModule } from './resource/diets/diet.module';
@Module({
  imports: [DietModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
