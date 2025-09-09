import { Test, TestingModule } from '@nestjs/testing';
import { NotebooksController } from './notebooks.controller';
import { NotebooksService } from './notebooks.service';
import { CreateNotebookDto } from './dto/create-notebook.dto';

describe('NotebooksController', () => {
  let controller: NotebooksController;

  const mockService = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, title: 'Test', content: 'Contenido' }]),
    create: jest.fn().mockResolvedValue({ id: 1, title: 'Test', content: 'Contenido' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotebooksController],
      providers: [
        { provide: NotebooksService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<NotebooksController>(NotebooksController);
  }); 

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería devolver notebooks', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([{ id: 1, title: 'Test', content: 'Contenido' }]);
  });

  it('debería crear una notebook', async () => {
    const dto = new CreateNotebookDto();
    dto.title = 'Test';
    dto.content = 'Contenido';

    const result = await controller.create(dto);
    expect(result).toEqual({ id: 1, title: 'Test', content: 'Contenido' });
  });

  it('debería lanzar error si findAll falla', async () => {
    mockService.findAll.mockRejectedValueOnce(new Error('Falla'));

    await expect(controller.findAll()).rejects.toThrow('Error retrieving notebooks');
  });

  it('debería lanzar error si create falla', async () => {
    mockService.create.mockRejectedValueOnce(new Error('Falla'));

    const dto = new CreateNotebookDto();
    dto.title = 'Error';
    dto.content = 'Contenido';

    await expect(controller.create(dto)).rejects.toThrow('Error creating notebook');
  });
});
