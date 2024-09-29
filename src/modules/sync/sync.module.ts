import { Module } from '@nestjs/common';
import { SyncService } from './sync.service';
import { FilmsModule } from '../films/films.module';
import { ScheduleModule } from '@nestjs/schedule';
import { PlanetsModule } from '../planets/planets.module';
import { StarshipsModule } from '../starships/starships.module';
import { PeopleModule } from '../people/people.module';

@Module({
  imports: [ScheduleModule.forRoot(),FilmsModule,PlanetsModule,StarshipsModule,PeopleModule], 
  providers: [SyncService]
})
export class SyncModule {}
