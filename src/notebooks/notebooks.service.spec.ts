import { Test, TestingModule } from '@nestjs/testing';
import { NotebooksService } from './notebooks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Notebook } from './entities/notebook.entity';
import { Repository } from 'typeorm';

describe('NotebooksService', () => {
  let service: NotebooksService;

  const mockNotebook = {
    id: 1,
    title: 'Mi primer notebook',
    content: 'Contenido de prueba',
  };

  const mockRepo = {
    find: jest.fn().mockResolvedValue([mockNotebook]),
    create: jest.fn().mockReturnValue(mockNotebook),
    save: jest.fn().mockResolvedValue(mockNotebook),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotebooksService,
        {
          provide: getRepositoryToken(Notebook),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<NotebooksService>(NotebooksService);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería devolver todos los notebooks', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockNotebook]);
  });

  it('debería crear un notebook', async () => {
    const dto = { title: 'Mi primer notebook', content: 'Contenido de prueba' };
    const result = await service.create(dto);
    expect(result).toEqual(mockNotebook);
  });
});
