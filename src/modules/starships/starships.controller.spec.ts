import { Test, TestingModule } from '@nestjs/testing';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './starships.service';
import { Starships, StarshipsDocument } from './starships.schema';
import { Document, Types } from 'mongoose';

describe('StarshipsController', () => {
  let controller: StarshipsController;
  let service: StarshipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StarshipsController],
      providers: [
        {
          provide: StarshipsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<StarshipsController>(StarshipsController);
    service = module.get<StarshipsService>(StarshipsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new starship', async () => {
      const createStarshipDto: Omit<Starships, '_id' | 'created' | 'edited'> = {
        name: 'Millennium Falcon',
        model: 'YT-1300 light freighter',
        manufacturer: 'Corellian Engineering Corporation',
        cost_in_credits: '100000',
        length: '34.75',
        max_atmosphering_speed: '1050',
        crew: '4',
        passengers: '6',
        cargo_capacity: '100000',
        consumables: '2 months',
        hyperdrive_rating: '0.5',
        MGLT: '75',
        starship_class: 'light freighter',
        pilots: [],
        films: [],
        url: 'http://example.com/millennium-falcon',
      };

      const expectedStarship: StarshipsDocument = {
        _id: new Types.ObjectId(),
        ...createStarshipDto,
        created: new Date(),
        edited: new Date(),
      } as StarshipsDocument;

      jest.spyOn(service, 'create').mockResolvedValue(expectedStarship);

      const result = await controller.create(createStarshipDto);
      expect(result).toEqual(expectedStarship);
      expect(service.create).toHaveBeenCalledWith(createStarshipDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of starships', async () => {
      const expectedStarships: StarshipsDocument[] = [
        {
          _id: new Types.ObjectId(),
          name: 'X-Wing',
          model: 'T-65 X-wing starfighter',
          manufacturer: 'Incom Corporation',
          cost_in_credits: '150000',
          length: '12.5',
          max_atmosphering_speed: '1050',
          crew: '1',
          passengers: '0',
          cargo_capacity: '110',
          consumables: '1 week',
          hyperdrive_rating: '1',
          MGLT: '100',
          starship_class: 'starfighter',
          pilots: [],
          films: [],
          url: 'http://example.com/x-wing',
          created: new Date(),
          edited: new Date(),
        } as StarshipsDocument,
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedStarships);

      const result = await controller.findAll({});
      expect(result).toEqual(expectedStarships);
      expect(service.findAll).toHaveBeenCalledWith({});
    });
  });
});
