import { Test, TestingModule } from '@nestjs/testing';
import { StarshipsService } from './starships.service';
import { getModelToken } from '@nestjs/mongoose';
import { Starships, StarshipsDocument } from './starships.schema';
import { Model } from 'mongoose';
import { Types } from 'mongoose';

describe('StarshipsService', () => {
  let service: StarshipsService;
  let starshipsModel: Model<StarshipsDocument>;

  const mockStarship = {
    _id: new Types.ObjectId(),
    name: 'Millennium Falcon',
    // Otros campos...
  };

  const mockStarshipsModel = {
    create: jest.fn().mockResolvedValue(mockStarship), // Simula la creación
    find: jest.fn().mockReturnThis(), // Simula la búsqueda
    exec: jest.fn().mockResolvedValue([mockStarship]), // Simula la ejecución de la búsqueda
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StarshipsService,
        {
          provide: getModelToken(Starships.name),
          useValue: mockStarshipsModel,
        },
      ],
    }).compile();

    service = module.get<StarshipsService>(StarshipsService);
    starshipsModel = module.get<Model<StarshipsDocument>>(getModelToken(Starships.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new starship', async () => {
      const createStarshipDto = { name: 'Millennium Falcon' }; // Datos de entrada
      const result = await service.create(createStarshipDto);
      expect(result).toEqual(mockStarship);
      expect(starshipsModel.create).toHaveBeenCalledWith(createStarshipDto);
    });
  });

  describe('findAll', () => {
    it('should find all starships', async () => {
      const result = await service.findAll(); // Llama al método de búsqueda
      expect(result).toEqual([mockStarship]);
      expect(starshipsModel.find).toHaveBeenCalledWith({}); // Verifica que se haya llamado sin filtros
    });
  });
});
