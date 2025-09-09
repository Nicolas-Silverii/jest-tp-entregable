import { Test, TestingModule } from '@nestjs/testing';
import { NotebooksController } from './notebooks.controller';
import { NotebooksService } from './notebooks.service';
import { CreateNotebookDto } from './dto/create-notebook.dto';
import { UpdateNotebookDto } from './dto/update-notebook.dto';


describe('NotebooksController', () => {
  let controller: NotebooksController;

  const mockService = {
    create: jest.fn().mockResolvedValue({ id: 1, title: 'Test', content: 'Contenido' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotebooksController],
      providers: [
        {
          provide: NotebooksService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<NotebooksController>(NotebooksController);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

it('debería crear una notebook', async () => {
  const dto = new CreateNotebookDto();
  dto.title = 'Test';
  dto.content = 'Contenido';

  const result = await controller.create(dto);
  expect(result).toEqual({ id: 1, title: 'Test', content: 'Contenido' });
});

it('debería instanciar UpdateNotebookDto', () => {
  const dto = new UpdateNotebookDto();
  dto.title = 'Título modificado';
  expect(dto).toBeInstanceOf(UpdateNotebookDto);
});

});
