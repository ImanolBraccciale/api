// src/modules/starships/starships.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {  HydratedDocument } from 'mongoose';

export type StarshipsDocument =  HydratedDocument<Starships>;

@Schema()
export class Starships {
  @Prop({ required: true })
  name: string; 

  @Prop({ required: true })
  model: string; 

  @Prop({ required: true })
  starship_class: string; 

  @Prop({ required: true })
  manufacturer: string;

  @Prop({ required: true })
  cost_in_credits: string; 

  @Prop({ required: true })
  length: string; 

  @Prop({ required: true })
  crew: string; 

  @Prop({ required: true })
  passengers: string; 

  @Prop({ required: true })
  max_atmosphering_speed: string; 

  @Prop({ required: true })
  hyperdrive_rating: string; 

  @Prop({ required: true })
  MGLT: string;

  @Prop({ required: true })
  cargo_capacity: string; 

  @Prop({ required: true })
  consumables: string; 

  @Prop([String]) 
  films: string[];

  @Prop([String]) 
  pilots: string[];

  @Prop({ required: true })
  url: string; 

  @Prop({ default: Date.now })
  created: Date;

  @Prop()
  edited: Date;
}

export const StarshipsSchema = SchemaFactory.createForClass(Starships);
