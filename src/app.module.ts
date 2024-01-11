import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DietModule } from './resource/diets/diet.module';
@Module({
  imports: [DietModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
