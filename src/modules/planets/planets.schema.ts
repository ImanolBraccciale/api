// src/modules/planets/planets.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {  HydratedDocument } from 'mongoose';

export type PlanetsDocument = HydratedDocument<Planets>;

@Schema()
export class Planets {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  rotation_period: string;

  @Prop({ required: true })
  orbital_period: string;

  @Prop({ required: true })
  diameter: string;

  @Prop({ required: true })
  climate: string;

  @Prop({ required: true })
  gravity: string;

  @Prop({ required: true })
  terrain: string;

  @Prop({ required: true })
  surface_water: string;

  @Prop({ required: true })
  population: string;

  @Prop([String]) 
  residents: string[];

  @Prop({ default: Date.now })
  created: Date;

  @Prop()
  edited: Date;

  @Prop({ required: true })
  url: string;
}

export const PlanetsSchema = SchemaFactory.createForClass(Planets);
