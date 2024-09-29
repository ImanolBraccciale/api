import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PeopleService } from './people.service';
import { People } from './people.schema';

@Controller('people')
export class PeopleController {
    constructor(private readonly peopleService: PeopleService) { }

    @Post()
    async create(@Body() createPeopleDTO: Partial<People>): Promise<People> {
        return this.peopleService.create(createPeopleDTO);
    }
    @Get()
    async findAll(@Query() query: any) {
        return this.peopleService.findAll(query);
    }
}