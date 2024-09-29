import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Planets } from './planets.schema';
import { PlanetsService } from './planets.service';

@Controller('planets')
export class PlanetsController {
    constructor(private readonly planetsService: PlanetsService) {}

    @Post()
    async create(@Body() createPlanetsDto: Partial<Planets>): Promise<Planets> {
        return this.planetsService.create(createPlanetsDto);
    }

    @Get()
    async findAll(@Query() filters: any): Promise<Planets[]> {
        return this.planetsService.findAll(filters);
    }
}