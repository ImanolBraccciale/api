import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Films, filmsDocument } from './films.schema';
import { FilmsFilterBuilder } from 'src/design/films';

@Injectable()
export class FilmsService {
    constructor(@InjectModel(Films.name) private filmsModel: Model<filmsDocument>) { }

    async create(createFilmDto: Partial<Films>): Promise<filmsDocument> {
        const createdFilm = new this.filmsModel(createFilmDto);
        return createdFilm.save();
    }

    async findAll(filters?: any): Promise<Films[]> {
        const query = filters ? new FilmsFilterBuilder().build()(filters) : {};
        return this.filmsModel.find(query).exec();
    }


}
