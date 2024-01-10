import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DietModule } from './resource/diets/diet.module';
@Module({
  imports: [DietModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
