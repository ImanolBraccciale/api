import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleModule } from './modules/people/people.module';
import { FilmsModule } from './modules/films/films.module';
import { StarshipsController } from './modules/starships/starships.controller';
import { StarshipsService } from './modules/starships/starships.service';
import { PlanetsService } from './modules/planets/planets.service';
import { PlanetsModule } from './modules/planets/planets.module';
import { SyncModule } from './modules/sync/sync.module';
 import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { StarshipsModule } from './modules/starships/starships.module';

dotenv.config();
const DB_URI=process.env.DB_URL!
@Module({
  imports: [PeopleModule, 
    FilmsModule,
     PlanetsModule,
     StarshipsModule,
     SyncModule, 
    MongooseModule.forRoot(DB_URI),
  ],
  controllers: [AppController ],
  providers: [AppService],
})
export class AppModule {}
