import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {  HydratedDocument } from 'mongoose';
 
export type filmsDocument = HydratedDocument<Films>;


@Schema()
export class Films {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  episode_id: number;

  @Prop({ required: true })
  opening_crawl: string;

  @Prop({ required: true })
  director: string;

  @Prop({ required: true })
  producer: string;

  @Prop({ required: true })
  release_date: Date;

  @Prop([String]) 
  species: string[];

  @Prop([String]) 
  starships: string[];

  @Prop([String]) 
  vehicles: string[];

  @Prop([String]) 
  characters: string[];

  @Prop([String]) 
  planets: string[];

  @Prop({ required: true })
  url: string; 

  @Prop({ default: Date.now })
  created: Date;

  @Prop()
  edited: Date;
}

export const FilmsSchema = SchemaFactory.createForClass(Films);
