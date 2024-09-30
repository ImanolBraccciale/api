import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Films, filmsDocument } from './films.schema';
import { FilmsFilterBuilder } from '../../design/films';
 
@Injectable()
export class FilmsService {
    constructor(@InjectModel(Films.name) private filmsModel: Model<filmsDocument>) { }

    async create(createFilmDto: Partial<Films>): Promise<filmsDocument> {
        return this.filmsModel.create(createFilmDto)
    }

    async findAll(filters?: any): Promise<Films[]> {
        const query = filters ? new FilmsFilterBuilder().build()(filters) : {};
        if (filters?.title) {
            query.title = { $regex: new RegExp(filters.title, 'i') };
          }
        return this.filmsModel.find(query).exec();
    }


}
