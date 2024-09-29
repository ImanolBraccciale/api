import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Films, FilmsSchema } from './films.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Films.name, schema: FilmsSchema }])
  ],
  controllers: [FilmsController],
  providers: [FilmsService],
  exports: [FilmsService], 
})
export class FilmsModule {}
