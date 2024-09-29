import { Module } from '@nestjs/common';
import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Planets, PlanetsSchema } from './planets.schema';

@Module({imports: [
  MongooseModule.forFeature([{ name: Planets.name, schema: PlanetsSchema }])
],
  controllers: [PlanetsController],
  providers: [PlanetsService],
  exports: [PlanetsService]
})
export class PlanetsModule {}
