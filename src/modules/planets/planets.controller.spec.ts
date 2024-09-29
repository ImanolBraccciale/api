import { Test, TestingModule } from '@nestjs/testing';
import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';
import { Planets } from './planets.schema';
import { Document, Types } from 'mongoose';

// Actualiza la definición de Planets para incluir _id
interface PlanetsDocument extends Planets, Document {
  _id: Types.ObjectId;
}

describe('PlanetsController', () => {
  let controller: PlanetsController;
  let service: PlanetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanetsController],
      providers: [
        {
          provide: PlanetsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PlanetsController>(PlanetsController);
    service = module.get<PlanetsService>(PlanetsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new planet', async () => {
      const createPlanetDto: Omit<Planets, '_id' | 'created' | 'edited'> = {
        name: 'Earth',
        rotation_period: '24',
        orbital_period: '365',
        diameter: '12742',
        climate: 'temperate',
        gravity: '9.81',
        terrain: 'varied',
        surface_water: '71',
        population: '7 billion',
        residents: [],
        url: 'http://example.com/earth',
      };

      const expectedPlanet: PlanetsDocument = {
        _id: new Types.ObjectId(),
        ...createPlanetDto,
        created: new Date(),
        edited: new Date(),
      } as PlanetsDocument;

      jest.spyOn(service, 'create').mockResolvedValue(expectedPlanet);

      const result = await controller.create(createPlanetDto);
      expect(result).toEqual(expectedPlanet);
      expect(service.create).toHaveBeenCalledWith(createPlanetDto);
    });

    it('should handle creation errors', async () => {
      const createPlanetDto: Omit<Planets, '_id' | 'created' | 'edited'> = {
        name: 'Earth',
        rotation_period: '24',
        orbital_period: '365',
        diameter: '12742',
        climate: 'temperate',
        gravity: '9.81',
        terrain: 'varied',
        surface_water: '71',
        population: '7 billion',
        residents: [],
        url: 'http://example.com/earth',
      };

      jest.spyOn(service, 'create').mockRejectedValue(new Error('Creation failed'));

      await expect(controller.create(createPlanetDto)).rejects.toThrow('Creation failed');
      expect(service.create).toHaveBeenCalledWith(createPlanetDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of planets', async () => {
      const expectedPlanets: PlanetsDocument[] = [
        {
          _id: new Types.ObjectId(),
          name: 'Mars',
          rotation_period: '24',
          orbital_period: '687',
          diameter: '6779',
          climate: 'cold',
          gravity: '3.721',
          terrain: 'rocky',
          surface_water: '0',
          population: '0',
          residents: [],
          url: 'http://example.com/mars',
          created: new Date(),
          edited: new Date(),
        } as PlanetsDocument,
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedPlanets);

      const result = await controller.findAll({});
      expect(result).toEqual(expectedPlanets);
      expect(service.findAll).toHaveBeenCalledWith({});
    });
  });
});
