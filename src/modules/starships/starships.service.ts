import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Starships, StarshipsDocument } from './starships.schema';
import { Model } from 'mongoose';
import { StarshipsFilterBuilder } from 'src/design/starships';

@Injectable()
export class StarshipsService {
  constructor(@InjectModel(Starships.name) private starshipsModel: Model<StarshipsDocument>) {}

  async create(createStarshipDto: Partial<Starships>): Promise<StarshipsDocument> {
    const createdStarship = new this.starshipsModel(createStarshipDto);
    return createdStarship.save();
  }

  async findAll(queryParams: any): Promise<Starships[]> {
    const filterBuilder = new StarshipsFilterBuilder();

    // Aplicar filtros basados en los parámetros de consulta
    if (queryParams.name) {
      filterBuilder.addTextFilter('name', queryParams.name);
    }
    if (queryParams.model) {
      filterBuilder.addTextFilter('model', queryParams.model);
    }
    if (queryParams.starship_class) {
      filterBuilder.addTextFilter('starship_class', queryParams.starship_class);
    }
    if (queryParams.manufacturer) {
      filterBuilder.addTextFilter('manufacturer', queryParams.manufacturer);
    }
    if (queryParams.min_length && queryParams.max_length) {
      filterBuilder.addNumberRangeFilter('length', parseFloat(queryParams.min_length), parseFloat(queryParams.max_length));
    }
    if (queryParams.min_crew && queryParams.max_crew) {
      filterBuilder.addNumberRangeFilter('crew', parseInt(queryParams.min_crew), parseInt(queryParams.max_crew));
    }
    if (queryParams.min_passengers && queryParams.max_passengers) {
      filterBuilder.addNumberRangeFilter('passengers', parseInt(queryParams.min_passengers), parseInt(queryParams.max_passengers));
    }
    if (queryParams.film) {
      filterBuilder.addArrayContainsFilter('films', queryParams.film);
    }
    if (queryParams.pilot) {
      filterBuilder.addArrayContainsFilter('pilots', queryParams.pilot);
    }
    if (queryParams.created_after && queryParams.created_before) {
      filterBuilder.addDateRangeFilter('created', new Date(queryParams.created_after), new Date(queryParams.created_before));
    }

    const buildFilter = filterBuilder.build();
    const filters = buildFilter({});

    return this.starshipsModel.find(filters).exec();
  }
}