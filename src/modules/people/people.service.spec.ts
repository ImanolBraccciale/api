import { Test, TestingModule } from '@nestjs/testing';
import { PeopleService } from './people.service';
import { getModelToken } from '@nestjs/mongoose';
import { People } from './people.schema';

describe('PeopleService', () => {
  let service: PeopleService;
  const mockPeopleModel = {
    find: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PeopleService,
        {
          provide: getModelToken(People.name),
          useValue: mockPeopleModel,
        },
      ],
    }).compile();

    service = module.get<PeopleService>(PeopleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new person', async () => {
    const createPeopleDto = { name: 'John', birth_year: '1990' };
    mockPeopleModel.create.mockReturnValue(createPeopleDto);
    const result = await service.create(createPeopleDto);
    expect(result).toEqual(createPeopleDto);
  });
});
