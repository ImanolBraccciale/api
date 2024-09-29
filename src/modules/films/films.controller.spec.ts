import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
 import { Document, Types } from 'mongoose';
import { Films } from './films.schema';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

   type filmsDocument = Document & Films & {
    _id: Types.ObjectId;
    __v?: number;
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new film', async () => {
      const createFilmDto: Omit<Films, '_id' | 'created' | 'edited'> = {
        title: 'A New Hope',
        episode_id: 4,
        opening_crawl: 'It is a period of civil war...',
        director: 'George Lucas',
        producer: 'Gary Kurtz',
        release_date: new Date('1977-05-25'),
        species: [],
        starships: [],
        vehicles: [],
        characters: [],
        planets: [],
        url: 'http://example.com/a-new-hope',
      };

      const expectedFilm: filmsDocument = {
        _id: new Types.ObjectId(),
        ...createFilmDto,
        created: new Date(),
        edited: new Date(),
      } as filmsDocument;

      jest.spyOn(service, 'create').mockResolvedValue(expectedFilm);

      const result = await controller.create(createFilmDto);
      expect(result).toEqual(expectedFilm);
      expect(service.create).toHaveBeenCalledWith(createFilmDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of films', async () => {
        const filmsData: filmsDocument[] = [
            {
              _id: new Types.ObjectId(),
              title: 'The Empire Strikes Back',
              episode_id: 5,
              opening_crawl: 'It is a dark time for the Rebellion...',
              director: 'Irvin Kershner',
              producer: 'Gary Kurtz',
              release_date: new Date('1980-05-21'), // Asegúrate de usar Date aquí
              species: [], 
              starships: [], 
              vehicles: [], 
              characters: [], 
              planets: [], 
              url: 'http://example.com/the-empire-strikes-back',
              created: new Date(),
              edited: new Date(),
            } as filmsDocument,
          ];
      jest.spyOn(service, 'findAll').mockResolvedValue(filmsData);

      const result = await controller.findAll({});
      expect(result).toEqual(filmsData);
      expect(service.findAll).toHaveBeenCalledWith({});
    });
  });
});
