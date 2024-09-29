import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Starships, StarshipsDocument } from './starships.schema';
import { Model } from 'mongoose';
import { StarshipsFilterBuilder } from '../../design/starships';

@Injectable()
export class StarshipsService {
  constructor(@InjectModel(Starships.name) private starshipsModel: Model<StarshipsDocument>) {}

  async create(createStarshipDto: Partial<Starships>): Promise<StarshipsDocument> {
    return this.starshipsModel.create(createStarshipDto);

  }
   async findAll(filters?: any): Promise<Starships[]> {
    const query = filters ? new StarshipsFilterBuilder().build()(filters) : {};
    return this.starshipsModel.find(query).exec();
  }
}