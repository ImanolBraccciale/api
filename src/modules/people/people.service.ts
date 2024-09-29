import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { People, PeopleDocument } from './people.schema';
import { Model } from 'mongoose';
import { PeopleFilterBuilder } from 'src/design/people';

@Injectable()
export class PeopleService {
  constructor(@InjectModel(People.name) private peopleModel: Model<PeopleDocument>) {}

  async create(createPeopleDto: Partial<People>): Promise<PeopleDocument> {
    const createdPeople = new this.peopleModel(createPeopleDto);
    return createdPeople.save();
  }


  async findAll(filters: any): Promise<People[]> {
     const query = filters ? new PeopleFilterBuilder().build()(filters) : {};
    return this.peopleModel.find(query).exec();
  }
}