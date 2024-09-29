import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { FilmsService } from './films.service';
import { Films } from './films.schema';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Post()
  async create(@Body() createFilmDto: Partial<Films>): Promise<Films> {
      return this.filmsService.create(createFilmDto);
  }

  @Get()
  async findAll(@Query() filters: any): Promise<Films[]> {
      return this.filmsService.findAll(filters);
  }
}
