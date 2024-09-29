import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Planets, PlanetsDocument } from './planets.schema';
import { Model } from 'mongoose';
import { PlanetsFilterBuilder } from '../../design//planets';

@Injectable()
export class PlanetsService {
    constructor(@InjectModel(Planets.name) private planetsModel: Model<PlanetsDocument>) {}
  
    async create(createPlanetDto: Partial<Planets>): Promise<PlanetsDocument> {
      return this.planetsModel.create(createPlanetDto)
    }
  
    async findAll(filters?: any): Promise<Planets[]> {
      const query = filters ? new PlanetsFilterBuilder().build()(filters) : {};
      return this.planetsModel.find(query).exec();
  }
  }