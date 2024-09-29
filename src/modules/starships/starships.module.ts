import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Starships, StarshipsSchema } from './starships.schema';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './starships.service';

@Module({imports: [
    MongooseModule.forFeature([{ name: Starships.name, schema: StarshipsSchema }])
  ],
    controllers: [StarshipsController],
    providers: [StarshipsService],
    exports: [StarshipsService],
  })
export class StarshipsModule {}
 
 