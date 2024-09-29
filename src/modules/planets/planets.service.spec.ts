import { Test, TestingModule } from '@nestjs/testing';
import { PlanetsService } from './planets.service';
import { getModelToken } from '@nestjs/mongoose';
import { Planets, PlanetsDocument } from './planets.schema';
import { Model } from 'mongoose';
import { Types } from 'mongoose';

describe('PlanetsService', () => {
  let service: PlanetsService;
  let planetsModel: Model<PlanetsDocument>;

  const mockPlanet = {
    _id: new Types.ObjectId(),
    name: 'Earth',
    rotation_period: '24 hours',
    orbital_period: '365 days',
    diameter: '12742 km',
    climate: 'temperate',
    gravity: '1g',
    terrain: 'varied',
    surface_water: '71%',
    population: '7 billion',
    residents: [],
    created: new Date(),
    edited: new Date(),
    url: 'http://example.com/earth',
  };

  const mockPlanetsModel = {
    create: jest.fn().mockImplementation(async (dto) => {
      return { ...mockPlanet, ...dto }; // Combina el mock con los datos de entrada
    }),
    find: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue([mockPlanet]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanetsService,
        {
          provide: getModelToken(Planets.name),
          useValue: mockPlanetsModel,
        },
      ],
    }).compile();

    service = module.get<PlanetsService>(PlanetsService);
    planetsModel = module.get<Model<PlanetsDocument>>(getModelToken(Planets.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new planet', async () => {
      const createPlanetDto = {
        name: 'Earth',
        rotation_period: '24 hours',
        orbital_period: '365 days',
        diameter: '12742 km',
        climate: 'temperate',
        gravity: '1g',
        terrain: 'varied',
        surface_water: '71%',
        population: '7 billion',
        residents: [],
        url: 'http://example.com/earth',
      };

      const result = await service.create(createPlanetDto); // Llama al método de creación
      expect(result).toEqual(mockPlanet); // Verifica que el resultado sea el esperado
      expect(planetsModel.create).toHaveBeenCalledWith(createPlanetDto); // Verifica que se haya llamado con los datos correctos
    });
  });

  describe('findAll', () => {
    it('should find all planets', async () => {
      const result = await service.findAll(); // Llama al método de búsqueda
      expect(result).toEqual([mockPlanet]); // Verifica que el resultado sea el esperado
      expect(planetsModel.find).toHaveBeenCalledWith({}); // Verifica que se haya llamado sin filtros
    });
  });
});
