import { Test, TestingModule } from '@nestjs/testing';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { People } from './people.schema';
import { Document, Types } from 'mongoose';

// Actualiza la definición de People para incluir _id
interface PeopleDocument extends People, Document {
  _id: Types.ObjectId;
}

describe('PeopleController', () => {
  let controller: PeopleController;
  let service: PeopleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeopleController],
      providers: [
        {
          provide: PeopleService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PeopleController>(PeopleController);
    service = module.get<PeopleService>(PeopleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new person', async () => {
      const createPeopleDto: Omit<People, '_id' | 'created' | 'edited'> = {
        name: 'John Doe',
        birth_year: '1990',
        eye_color: 'blue',
        gender: 'male',
        hair_color: 'brown',
        height: '180',
        mass: '75',
        skin_color: 'fair',
        homeworld: 'Earth',
        films: [],
        species: [],
        starships: [],
        vehicles: [],
        url: 'http://example.com/johndoe',
      };

      const expectedPerson: PeopleDocument = {
        _id: new Types.ObjectId(),
        ...createPeopleDto,
        created: new Date(),
        edited: new Date(),
      } as PeopleDocument;

      jest.spyOn(service, 'create').mockResolvedValue(expectedPerson);

      const result = await controller.create(createPeopleDto);
      expect(result).toEqual(expectedPerson);
      expect(service.create).toHaveBeenCalledWith(createPeopleDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of people', async () => {
      const expectedPeople: PeopleDocument[] = [
        {
          _id: new Types.ObjectId(),
          name: 'Jane Doe',
          birth_year: '1995',
          eye_color: 'green',
          gender: 'female',
          hair_color: 'blonde',
          height: '165',
          mass: '60',
          skin_color: 'light',
          homeworld: 'Earth',
          films: [],
          species: [],
          starships: [],
          vehicles: [],
          url: 'http://example.com/janedoe',
          created: new Date(),
          edited: new Date(),
        } as PeopleDocument,
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedPeople);

      const result = await controller.findAll({});
      expect(result).toEqual(expectedPeople);
      expect(service.findAll).toHaveBeenCalledWith({});
    });
  });
});