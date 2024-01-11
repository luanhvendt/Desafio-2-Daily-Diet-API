import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { DietService } from './diet.service';
import { QueryDietDto } from './dto/query-diet-dto';
import { DietEntity } from './entities/diet.entity';

@Controller('diet')
@UseGuards(JwtAuthGuard)
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
  findAll(@Query() query: QueryDietDto) {
    return this.dietService.findAll(query);
  }

  @Get(':id')
  @HttpCode(200)
  findUnique(@Param('id') id: string) {
    return this.dietService.findUnique(id);
  }

  @Get('/summary/:sessionId')
  @HttpCode(200)
  findSummary(@Param('sessionId') sessionId: string) {
    return this.dietService.findSummary(sessionId);
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
