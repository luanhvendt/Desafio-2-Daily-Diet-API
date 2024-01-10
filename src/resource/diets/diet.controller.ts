import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { DietService } from './diet.service';
import { DietEntity } from './entities/diet.entity';

@Controller('diet')
export class DietController {
  constructor(
    private readonly dietService: DietService
  ) { }

  @Post()
  @HttpCode(201)
  create(@Body() TaskEntity: DietEntity) {
    return this.dietService.create(TaskEntity)
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.dietService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findUnique(@Param('id') id: string) {
    return this.dietService.findUnique(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDietDto: DietEntity) {
    return this.dietService.update(id, updateDietDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.dietService.delete(id);
  }
}
