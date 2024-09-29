// src/modules/films/films.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { getModelToken } from '@nestjs/mongoose';
 import { Model } from 'mongoose';
import { Types } from 'mongoose';
import { Films, filmsDocument } from './films.schema';

describe('FilmsService', () => {
  let service: FilmsService;
  let filmsModel: Model<filmsDocument>;

  const mockFilm = {
    _id: new Types.ObjectId(),
    title: 'Inception',
    director: 'Christopher Nolan',
    // Otros campos...
  };

  const mockFilmsModel = {
    create: jest.fn().mockResolvedValue(mockFilm), // Simula la creación
    find: jest.fn().mockReturnThis(), // Simula la búsqueda
    exec: jest.fn().mockResolvedValue([mockFilm]), // Simula la ejecución de la búsqueda
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: getModelToken(Films.name),
          useValue: mockFilmsModel,
        },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
    filmsModel = module.get<Model<filmsDocument>>(getModelToken(Films.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new film', async () => {
      const createFilmDto = { title: 'Inception', director: 'Christopher Nolan' }; // Datos de entrada
      const result = await service.create(createFilmDto);
      expect(result).toEqual(mockFilm); // Verifica que el resultado sea el esperado
      expect(filmsModel.create).toHaveBeenCalledWith(createFilmDto); // Verifica que se haya llamado con los datos correctos
    });
  });

  describe('findAll', () => {
    it('should find all films', async () => {
      const result = await service.findAll(); // Llama al método de búsqueda
      expect(result).toEqual([mockFilm]); // Verifica que el resultado sea el esperado
      expect(filmsModel.find).toHaveBeenCalledWith({}); // Verifica que se haya llamado sin filtros
    });
  });
});
