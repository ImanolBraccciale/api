import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { Starships } from './starships.schema';

@Controller('starships')
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) {}
  @Post()
  async create(@Body() createStarshipDto: Partial<Starships>): Promise<Starships> {
    return this.starshipsService.create(createStarshipDto);
  }
  @Get()
  async findAll(@Query() query: any) {
    return this.starshipsService.findAll(query);
  }
}