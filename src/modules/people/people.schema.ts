// src/modules/people/people.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type PeopleDocument =  HydratedDocument<People>;

@Schema()
export class People {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  birth_year: string;

  @Prop({ required: true })
  eye_color: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  hair_color: string;

  @Prop({ required: true })
  height: string;

  @Prop({ required: true })
  mass: string;

  @Prop({ required: true })
  skin_color: string;

  @Prop({ type: String }) 
  homeworld: string;

  @Prop([String]) 
  films: string[];

  @Prop([String]) 
  species: string[];

  @Prop([String]) 
  starships: string[];

  @Prop([String]) 
  vehicles: string[];

  @Prop({ default: Date.now })
  created: Date;

  @Prop()
  edited: Date;

  @Prop({ required: true })
  url: string; 
}

export const PeopleSchema = SchemaFactory.createForClass(People);
