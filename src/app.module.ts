import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DietModule } from './resource/diets/diet.module';
import { UsersModule } from './resource/users/users.module';
@Module({
  imports: [DietModule, AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
